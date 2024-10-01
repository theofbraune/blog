
+++
title= "Surface Denoising"
date= 2022-06-16T10:26:46+02:00
draft= false
author = "Theo"
tags = ["programming"]
summary = "This post is the summary of the results for a project undertaken at ENS to implement and compare different denoising techniques of meshes."
+++


In this post, I present various iterative mesh denoising algorithms. In the initial phase, I implement different filters to smooth a given mesh using local averaging methods. Specifically, we will implement three different filters: one using a combinatorial average of vertex positions, another based on the distance between neighboring vertices, and the third employing the Laplace operator with cotangent angle weights.

This project was undertaken as part of the course "Mathematiques des données" at École Normale Supérieure. It is inspired by the work [Implicit Fairing of Irregular Meshes using Diffusion and Curvature Flow](https://pages.saclay.inria.fr/mathieu.desbrun/pubs/DMSB_SIG99.pdf).

### The Method

Given any (not necessarily discrete) manifold $M$, we can consider the intrinsic Laplace-Beltrami operator $\Delta$. For this work, we assume the existence of an underlying smooth ground truth manifold $\tilde{M}$, and that the given manifold $M$ is a perturbation of this smooth ground truth. The denoising approach involves treating the noisy mesh as the initial condition of a heat equation. Similar to heat distribution in a one-dimensional case, where heat diffuses over time, the goal is to use heat flow to smooth out noise at specific vertices, thereby distributing the error across a neighborhood. This technique aims to remove noise without significantly altering the mesh.

In the discrete case, given a two-dimensional mesh, I will employ a discrete Laplace operator, formulate a discrete heat equation, and use a time integrator to update the positions of the mesh vertices.

#### Implementation of Different Techniques

For the implementation of the heat flow, we need to use a discrete Laplace operator. We discretely construct a matrix $W \in \mathbb{R}^{|V| \times |V|}$ such that for $(i,j) \in E$, we define a specific *edge weight* $w_{ij} \in \mathbb{R}_+$.

We obtain a matrix
$$W \in \mathbb{R}^{|V| \times |V|} \text{, where } w_{ij}= 0 \text{ if } (i,j) \notin E \text{, and } w_{ij} \geq 0 \text{ if } (i,j) \in E.$$

The simplest way to define such a matrix is given by the choice of 
$$w_{ij} = \begin{cases}
0, \quad (i,j) \notin \mathcal{E}\\\
1, \quad (i,j) \in \mathcal{E}
\end{cases}, $$
which will be our combinatorial weights.
Another option is given by 
$$w_{ij} = \begin{cases}
0, \quad (i,j) \notin E\\\
\| v_i - v_j \|, \quad (i,j) \in E
\end{cases}.$$
Yet another approach is to define the weights as 
$$w_{ij} = \begin{cases}
0, \quad (i,j) \notin E\\\
\cot(\alpha_{ij}) + \cot(\beta_{ij}), \quad (i,j) \in E
\end{cases}.$$

For this matrix $W$, let $D \in \mathbb{R}^{|V| \times |V|}$ be a diagonal matrix defined by 
$$D_{ii} = \sum_{(i,j) \in \mathcal{E}} w_{ij}.$$

The discrete Laplace operator is subsequently defined as 
$$\Delta  = D^{-1} W.$$

With these operators in place, consider the heat equation 
$$ \frac{\partial u}{\partial t} = \Delta u, $$
where we use the initial noisy mesh as the initial condition. I use a forward Euler scheme to update the mesh positions. If $V^{n}$ denotes the mesh positions at the $n$-th step, given a time step $\tau > 0$, we have the relation
$$\partial_t V^{(t)} = \Delta V^{(t)} \Longrightarrow \quad \frac{1}{\tau}(V^{(n+1)} - V^{(n)}) = -D^{-1}L V^{(n)},$$

and therefore 
$$V^{(n+1)} = (1 - \tau) \cdot V^{(n)} + \tau \tilde{W} V^{(n)}.$$

Consider the following knot with noise:
{{< figure src="/images/surface_denoising/knot_iter/Figure_original.png" width="30%" height="30%" >}}
{{< figure src="/images/surface_denoising/knot_iter/Figure_noise.png" width="30%" height="30%" alt="Noise Figure">}}

We apply one iteration of denoising using the combinatorial Laplacian and diffusion, one with the Laplacian with distance weights, and one with the Laplacian with cotangent weights. This yields:
{{< figure src="/images/surface_denoising/knot_1_iter.png" width="60%" height="60%" >}}

Thus, in this example, it turns out that visually the combinatorial Laplacian is the most appealing.


#### Validation of the Denoising Techniques

To compare the performance of the denoising algorithms beyond visual aspects, we consider the Signal-to-Noise Ratio (SNR). This metric measures the amount of noise in one mesh relative to another. Given meshes $M$ and $\tilde{M}$ with the same number of vertices and the same edge set, we define the *signal-to-noise ratio* as:$$ \operatorname{SNR}(M,\tilde{M}) = -20\cdot\log_{10}\bigg(\frac{\sum_{i}\ || v_i-\tilde{v}_i|| }{\Sigma_i\  || v_i || } \bigg) .$$
For the presented mesh, the combinatorial Laplacian seems to converge the best. After 10 iterations, the denoised mesh appears as follows:
{{< figure src="/images/surface_denoising/knot_10_iter.png" width="60%" height="60%" >}}

We observe that the combinatorial Laplacian makes the mesh smoother but also causes it to shrink. Consequently, the actual vertex positions for the target mesh may differ significantly, and although the mesh appears smooth, it may have high SNR values.

It turns out that the combinatorial Laplacian can indeed alter the mesh. Consider, for example, an F-16 jet with missiles. In this case, with some added noise, we observe that the mesh quality can worsen:
{{< figure src="/images/surface_denoising/f16_issue_comb.png" width="60%" height="60%" >}}

In this example, the main body of the mesh becomes smoother, but the details of the surface are entirely removed. It appears that the missiles are actually "fired off." The diffusion from the cotangent Laplacian, however, is better at preserving geometric features, though the main body is denoised more slowly:
{{< figure src="/images/surface_denoising/f16_ctan_comb.png" width="60%" height="60%" >}}

The time evolution for the combinatorial denoising can be seen here:
{{< figure src="/images/surface_denoising/f16_different_appr_0_2.gif" width="45%" height="45%" >}}

The code for this project can be found [here.](https://github.com/theofbraune/project_mathdd)


