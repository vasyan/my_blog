---
title: 'Fixing ArtemisMQ Docker Issues on M4 MacBook: Solving the hsdis Bug'
description: 'Encountered a strange crash running artemisMQ in Docker on the new M4 MacBook? This post explores a mysterious hsdis library bug, failed multi-platform builds, and the surprising solution using Colima to build an amd64 container. Save time with this quick fix!'
date: '2024-12-05'
categories:
    - 'docker'
    - 'm4'
    - 'macos'
---

I got a new M4 chipset MacBook last week and instantly encountered a strange bug inside a Docker container running `artemisMQ`. The issue was related to a mysterious problem with the `hsdis` library. There isn't much information available online about this new chipset, so I hope this note will save someone some time.

```sh
# A fatal error has been detected by the Java Runtime Environment:
#
#  SIGILL (0x4) at pc=0x0000ffff9cb3fc5c, pid=7, tid=15
#
# JRE version:  (21.0.3+9) (build )
# Java VM: OpenJDK 64-Bit Server VM (21.0.3+9-LTS, mixed mode, sharing, tiered, compressed oops, compressed class ptrs, g1 gc, linux-aarch64)
# Problematic frame:
# j  java.lang.System.registerNatives()V+0 java.base@21.0.3
#
# No core dump will be written. Core dumps have been disabled. To enable core dumping, try "ulimit -c unlimited" before starting Java again.
#
# An error report file with more information is saved as:
# /var/lib/artemis-instance/hs_err_pid7.log
[0.046s][warning][os] Loading hsdis library failed
#
# The crash happened outside the Java Virtual Machine in native code.
# See problematic frame for where to report the bug.
```

The container worked perfectly on M1, M2, and M3 machines. However, an attempt to build a multi-platform container failed. I tried running it in a VM like `Canonical Multipass` and using `podman` with alternative Linux images, but nothing worked.

Finally, the issue was resolved by installing [Colima](https://github.com/abiosoft/colima). Somehow, it allowed me to build an `amd64` version, which I have been using since.

```sh
docker buildx build --platform linux/amd64 -t artemis_amd64:latest
```
