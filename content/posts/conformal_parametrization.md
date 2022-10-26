+++
title= "Conformal Parametrization"
date= 2022-10-25T16:03:37+02:00
draft= true
author = "Jiayi & Theo"
tags = []
+++
In this TP we want to calculate the harmonic and the conformal parametrization of a mesh.

You will need to complete the class methods in the class ``ConformalParametrization`` that you will find in the header ``conformal.cpp``. In order to see the goal of the TP, you can press 4 to use the pre-build Libigl method of the conformal parametrization on the mesh.
{{< figure src="/images/conformal_parametrization/beetle_after.png"   width="50%" height="50%" >}}
A detailed description about the task and further information can be found in the [original publication.](/images/conformal_parametrization/lscm_pub_2002.pdf)  

### Harmonic Parametrization

As a first step, you should build the matrix for the Dirichlet energy/cotangent Laplacian. The first task will be to implement a harmonic parametrization. In order to do this load the camelhead or the mask file and parametrize a circle (or your favorite shape) in the plane with the same number of points, that the boundary has.
You will now need to build the cotangent Laplacian. To do this complete the method ``compute_dirichlet()`` in the class ``ConformalParametrization``. 


