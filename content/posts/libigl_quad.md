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

Suppose we are given an ``.obj`` file that does not consist of triangles only, we provide a method to parse the file. In contrast to 

```c++

std::vector<Eigen::MatrixXd> V;
std::vector<std::vector<int>> F;
void FullDEC_cell::parse_obj(const char * path){
    std::ifstream file(path);
    if (file.is_open()) {
        std::string line;
        while (std::getline(file, line)) {
            if (line.substr(0,2)=="v "){
                std::istringstream v(line.substr(2));
                double x,y,z;
                v>>x;v>>y;v>>z;
                Eigen::MatrixXd vertex= (Eigen::MatrixXd(1,3)<<x,y,z).finished();
                V.push_back(vertex);
            }
            //check for faces
            else if(line.substr(0,2)=="f "){
                std::istringstream v;
                v.str(line.substr(2));
                const char* chh=line.c_str();
                std::vector<int> face_vector_indices;
                for(int i = 0; i< strlen(chh); i++){
                    if(isdigit(chh[i])){
                        unsigned int uintVar = chh[i] - '0';
                        face_vector_indices.push_back(uintVar);
                    }
                }
                ntriangles+= face_vector_indices.size()-2;
                F.push_back(face_vector_indices);
            }
            //check for vertex normals
            else if(line.substr(0,2)=="vn"){
                std::istringstream v(line.substr(2));
                double x,y,z;
                v>>x;v>>y;v>>z;
                Eigen::Vector3d normal= Vector3d(x,y,z);
                vertex_normal.push_back(normal);
                vertex_normal_obtained = true;
            }

        }
            
    }
    
    file.close();
}

```


This allows us to read the vertex positions, the face indices and store them in vectors. In contrast to the ordinary libigl case, they are not stored in a common Matrix of size $|V|\times 3$ and an integer matrix, that indicates the vertex indices of each face. We store the vertices and indices in c++ vectors. They can be instances of a class to be further processed. A similar method can be build to parse ``.off`` files that do not store triangulated surfaces.

### Building a triangulation for the visualization.

In the next step we will use the vectors that represent the faces to build a triangulation of the cell. We pass this to the libigl viewer to show a mesh.

```c++
void build_triangulation(MatrixXd& V_triangulation, MatrixXi &F_triangulation ){
    //loop over all vertices
    V_triangulation = MatrixXd::Zero(V.size(),3);
    for(int vtx = 0; vtx< V.size(); vtx++){
        centroid+= toVector(V[vtx]);
        V_triangulation(vtx,0) = (V[vtx])(0,0);
        V_triangulation(vtx,1) = (V[vtx])(0,1);
        V_triangulation(vtx,2) = (V[vtx])(0,2);
    }

    F_triangulation = MatrixXi::Zero(ntriangles,3);
    int counter = 0;
    for(int fc = 0; fc< F.size(); fc++){
        std::vector<int> face = F[fc];
        //now loop over the points on the boundary.
        int f0 = face[0];
        for(int i = 1; i< face.size()-1; i++){
            int f1 = face[i];
            int f2 = face[i+1];
            F_triangulation(counter,0) = f0;
            F_triangulation(counter,1) = f1;
            F_triangulation(counter,2) = f2;
            counter+=1;
        }
        
    }
}

```


In order to visualize the initial non-triangular surface we build a second mesh, a wireframe consisting out of cylinders over the original primal edges.
