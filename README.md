# Shader Playground

Originally developed by Jorge Palacios for teaching Computer Graphics at Universidad Simón Bolívar, Venezuela. You are welcome to copy and modify it as any other student for your own perusal.

This playground may grow as my time teaching Computer Graphics grows as well, and I'm able find ways to better collaborate with students, and offer them a good starting point to practice what we learn about shaders.

Keep an eye on the main repo to track changes or, better yet, star it.

## Development environment

This playground was developed using the following tech stack:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js v20.13.1](https://nodejs.org/en)
- [Vite](https://vite.dev/)
- [Vite Plugin GLSL](https://www.npmjs.com/package/vite-plugin-glsl)
- [Three.js](https://threejs.org/)

## How to use this playground

There are different ways of using this playground project:

1. You can use it to test your shaders via Three.js using the already set up scene.
2. You can use it to test your fragment shaders on Visual Studio Code using the glslCanvas plugin.
3. All of the above.

### Shader files

- `canvas.frag` - fragment shader to be used as base example when using the **glslCanvas** VSCode plugin
- `vertex.glsl` - vertex shader used in the Three.js project
- `fragment.glsl` - fragment shader used in the Three.js project

## How to run this project

1. Download and copy this project
2. Install a compatible Node.js version (I guess any v20.10+ should suffice)
3. Run `npm install` to install the dependencies
4. Run `npm run dev` to run the Three.js project, usually on port 5173
