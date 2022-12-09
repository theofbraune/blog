+++
title= "Conformal Parametrization"
date= 2022-10-25T16:03:37+02:00
draft= false
author = "Jiayi & Theo"
tags = []
+++
In this TP we want to calculate the harmonic and the conformal parametrization of a mesh.

You will need to complete the class methods in the class ``ConformalParametrization`` that you will find in the header ``conformal.cpp``. In order to see the goal of the TP, you can press 4 to use the pre-build Libigl method of the conformal parametrization on the mesh.
{{< figure src="/images/conformal_parametrization/beetle_after.png"   width="50%" height="50%" >}}
A detailed description about the task and further information can be found in the [original publication.](/images/conformal_parametrization/lscm_pub_2002.pdf)  

### Harmonic Parametrization

As a first step, you should build the matrix for the Dirichlet energy/cotangent Laplacian. The first task will be to implement a harmonic parametrization. In order to do this load the camelhead or the mask file and parametrize a square (or your favorite shape) in the plane with the same number of points as the boundary.
You will now need to build the cotangent Laplacian. To do this complete the method ``compute_dirichlet()`` in the class ``ConformalParametrization`` to build the discrete Laplacian. It is allowed to use the methods ``igl::boundary_loop()`` and ``igl::boundary_facets()`` in the task.
##### Sparse Matrices in Eigen
The matrices of interest will be sparse in our case. Therefore we are using a different datastructure to represent these matrices. Instead of saving every matrix entry, we will only save the non-zero entries with their respective positions and the value of the matrix at this entry.
{{< figure src="/images/conformal_parametrization/sparse_matrices_eigen.png"   width="70%" height="70%" >}}

A sparse matrix with double values can be declared through ``Eigen::SparseMatrix<double>``. In order to create such a matrix we need to create Triplets

``Eigen::Triplet<double>(row, column, value)`` and stack them in a vector. Then we can use the method ``setFromTriplets`` to fill the sparse matrix. We will need matrices of this type to use the in-build solver.


We want to solve the Poisson problem with a constraint on the boundary, i.e

$\Delta u = 0$ where $u\mid_{\partial M} = z_{c\partial M}$

We recommend to use the camelhead as a shape, since you will need to parametrize only one boundary in this case. 

{{< figure src="/images/conformal_parametrization/camelhead_to_square.png"   width="50%" height="50%" >}}

##### Minimization of quadratic energies in Libigl
To solve this Poisson problem we need to minimize the Dirichlet energy with the fixed boundary. Libigl has an in-build method to solve these kind of quadratic minimization problems. 
For a sparse, symmetric, positive definite $n\times n$ matrix $Q$ (hint: check whether your matrix is really positive definite...) and a vector $B$, let $\mid \partial M \mid$ be the number of points with constraint. Let $z_{\partial M}$ be a vector of shape $\mid \partial M \mid\times 1$ (not $\mid \partial M \mid\times 2$ !!) that indicate the point numbers with constraint. Let $z_{bc}$ be a vector of shape $\mid \partial M \mid\times 1$ with the constraints for the chosen points. In our cases for this task we can set $A_{eq} = 0$, an empty sparse matrix and $B, B_{eq}$ as zero vectors. 

Then we can solve the minimization problem

 min $ z^t Q z + z^t B$ where $z_{\partial M} = z_{bc}$ and $A_{eq} z = B_{eq}$ with the method

```cpp
igl::min_quad_with_fixed_data<double> data;
igl::min_quad_with_fixed_precompute(Q, zb, SparseMatrix<double>(),true, data); 
igl::min_quad_with_fixed_solve(data,B,zbc,VectorXd(),minimal_z);
```

Task: Modify your Laplacian such that you can use it for this minimizer. Experiment with different boundary shapes.

#### Bonus
Solve this problem without the in-build solver and code the constraint minimization yourself.

### Conformal Parametrization

With the working Laplacian build a sparse matrix ``Area``, complete the methods ``build_area`` with the formula from the lecture and ``build_conformal_energy``.

In the case of the harmonic parametrization we set a constraint on every vertex on the boundary. To complete the method ``minimize_energy`` you will fix the positions of 2 vertices on the boundary. Then modify the constraint minimization of the harmonic parametrization and compute the conformal parametrization.

Experiment fixing different vertices on the boundary or to place them at different positions
{{< figure src="/images/conformal_parametrization/new_beetle.png"   width="50%" height="50%" >}}

#### Bonus
For now we used the Laplacian with cotangent weights. Try to use a Laplacian with different weights. For example the euclidean distance between adjacent vertices or just the binary information (1 or 0) whether two vertices are connected.



