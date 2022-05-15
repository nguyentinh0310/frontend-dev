const path = require("path");
const removeImports = require("next-remove-imports")();

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  reactStrictMode: true,
};
module.exports = removeImports({});

