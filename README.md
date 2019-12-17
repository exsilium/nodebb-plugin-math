# NodeBB Math parser

A plugin to parse math codeblocks and render them currently with [KaTeX](https://github.com/KaTeX/KaTeX).

Packaged KaTeX version: `v0.11.1`

## Installation 

`npm install nodebb-plugin-math`

## Usage

Make sure the nodebb-plugin-markdown feature `Automatically detect and highlight code blocks` has been enabled.

Write a valid math block within a post as a code block:

\`\`\`math
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
\`\`\`

## Contributions

This software also uses portions of the following projects:

| Project             | Copyright                          |
| ------------------- | ---------------------------------- |
| nodebb-plugin-katex | Copyright (c) 2015 Benjamin Abel.  |
| KaTeX               | Copyright (c) 2019 Khan Academy    |