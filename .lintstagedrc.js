module.exports = {
  "**/*.ts?(x)": () => [
    "tsc -p tsconfig.json --noEmit",
    "prettier --write",
    "git add"
  ]
};
