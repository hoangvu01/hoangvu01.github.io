---
layout: single
title:  "WACC Compiler"
date:   2022-09-01 09:00:00 +0100
categories: project
---

### WACC Compiler
*2nd year group project* 

- Built a cross compiler (`x86-64` and `ARM11` architectures) for a `While`-like language
- Parser generator using `ANTLR4` and compiler written in `Kotlin`
- Semantic checks and error propagation
  - Meanningful error messages to help 
- Basic optimisations
  - Constant folding and propagation
  - Control flow analysis (Simplified version)

`fibonacci_iterative.wacc`
```
begin
  int i = 0 ;
  int f0 = 0 ;
  int f1 = 1 ;
  int save = 0;
  println "The first 20 fibonacci numbers are:" ;
  while i < 20 do
    print f0 ;
    print ", " ;
    save = f0 ;
    f0 = f1 ;
    f1 = save + f1 ;
    i = i + 1
  done ;
  println "..."
end

```