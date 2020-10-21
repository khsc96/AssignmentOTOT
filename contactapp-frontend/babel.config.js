module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": false,
      "helpers": false,
      "regenerator": true,
      "useESModules": false
    }],
  ]
};
