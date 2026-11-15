---
title: What is High Performance Computing?
date: 2026-11-15
summary: My notes on High Performance Computing and why I want to study it.
tags:
  - note
  - journal
  - HPC
  - computer-science
---
Reference: https://www.ibm.com/think/topics/hpc

---
## What is it?

Basically throw a bunch of computing resources at a complex problem that would take an eternity to solve. These problems stem from a variety of industries such as chemistry, meteorology, and mathematics. Specific problems including genome sequencing, intensive 3D graphics rendering, automated trading, computational fluid dynamics, and weather predictions.


## How does it work?

##### Parallel Computing
- Run multiple tasks simultaneously by breaking down the problem into smaller processes
- HPC clusters may use thousands to millions of processors/processor cores

##### Computer (HPC) Clusters

>"Multiple high-speed computer servers networked with a centralized scheduler[^1] that manages the parallel computing workload"

- Computers, aliased as 'nodes', more prevalently use GPU's but may use multi-core CPU's to perform mathematical calculations, ML[^2] models, and other intensive tasks

##### Other HPC Components
- Networking
- Memory
- Storage and File Systems
- Low Latency

##### Message Passing Interface (MPI)
- Standard library and protocol for parallel computer programming enabling users to communicate between nodes

## HPC vs. Quantum Computing

- Conventional bits (0 and 1) rather than qubits (quantum states existing as superpositions of 0 and 1)
- Quantum Computing would be a more efficient way of solving complex problems (e.g. molecular behavior)
- Quantum Computing is not expected to replace HPC, rather work in harmony to achieve optimal performance

## Why do I want to study it?

Consistently, I had wanted to understand computers from a fundamental level. The best way to learn about computers is to start from the bottom up. From transistors to low level programming. After taking my Computer Organization class at VT[^3] and designing a payload for my rocket design team, I wanted to pursue programming closer to the hardware rather than the software. Although I enjoy building things for the community, that is more of a hobby rather than a specialized skill. 

Hopefully, I will build some interesting projects in C++ using CUDA and the OpenMP library to learn about parallelism.

---
[^1]: a software component that decides which computer server performs which computing task, and when

[^2]: Machine Learning

[^3]: Virginia Tech
