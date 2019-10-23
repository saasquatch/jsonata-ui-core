 
var common = [
    "test/features/**/*.feature",
    "--require-module ts-node/register",
     `--format ${process.env.CI ? "progress" : "progress-bar"}`,
    `--format-options '{"snippetSyntax": "test/cucumberSnippet.js"}'`,
    `--require test/steps/**/*.ts --tags \"not @skip\"`
].join(" ");

module.exports = {
default: common
};