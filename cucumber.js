const common = {
  paths: ["features/**/*.feature"],

  require: ["step_definitions/**/*.js", "support/**/*.js"],

  format: [
    "progress-bar",
    "summary",
    "json:logs/cucumber-report.json",
    "html:logs/cucumber-report.html",
  ],

  publishQuiet: true,
};

module.exports = {
  default: {
    ...common,
    tags: "@desafio",
  },

  smoke: {
    ...common,
    tags: "@smoke",
  },

  ui: {
    ...common,
    tags: "@desafio and @ui",
  },

  api: {
    ...common,
    tags: "@desafio and @api",
  },

  all: {
    ...common,
  },
};
