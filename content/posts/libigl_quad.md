+++
title= "Using Libigl for non triangular meshes."
date= 2023-03-08T15:44:56+01:00
draft= true
author = "Theo"
tags = []
+++
Libigl is a powerful and simple library for geometry processign in c++. However to this day it is only possible to visualize and process triangulated surfaces. This is not suitable for all applications. In order to get around this limitation, I suggest a little hack. The overall idea will be to load for example an ``.obj`` file with non triangular faces in the library and store the faces as vectors of integers. After that one can decompose the faces into triangles and store them into a matrix ``Eigen::MatrixXi`` that can be passed to the Libigl viewer.

From that I build a second mesh, a wireframe for the original primal edges, that I put on top of the triangulated mesh. Like that one can visualize the initial primal edges.

This is not at all optimized onto efficiency, but it is a simple way to augment the capabilities of Libigl. 

