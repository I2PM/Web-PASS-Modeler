module.exports = {
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
      },
      postcss: {
        plugins: [],
      },
    },
    extract: false,
  },
  publicPath: "/PASS/",
  transpileDependencies: []
};
