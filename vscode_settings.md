# VS Code Settings

The following are the recommended settings when using VS Code and allowed me to have a better development experience.

## Plugins to be installed

- [WebGL GLSL Editor](https://marketplace.visualstudio.com/items?itemName=raczzalan.webgl-glsl-editor)
- [GLSL Canvas](https://marketplace.visualstudio.com/items?itemName=circledev.glsl-canvas)

## Settings file

Add the following lines in your VS Code `settings.json` file. This will allow you to have a better experience with the previously installed plugins.

```json
  // Add the following lines AFTER your regular config lines
  "glsl-canvas.antialias": true,
  "glsl-canvas.refreshOnSave": true,
  "glsl-canvas.refreshOnChange": false,
  "webgl-glsl-editor.format.placeSpaceAfterCommas": true,
  "webgl-glsl-editor.format.placeSpaceAfterKeywords": true,
  "[glsl]": {
    "editor.defaultFormatter": "raczzalan.webgl-glsl-editor"
  },
  "[frag]": {
    "editor.defaultFormatter": "raczzalan.webgl-glsl-editor"
  },
  "[vert]": {
    "editor.defaultFormatter": "raczzalan.webgl-glsl-editor"
  }
  //--- end of config lines
  // Thanks to Suboptimal Engineer for this config
```
