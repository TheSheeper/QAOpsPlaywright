module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["tsx"],
    require: ["features/support/**/*.ts", "features/step_definitions/**/*.ts"],
  },
};
