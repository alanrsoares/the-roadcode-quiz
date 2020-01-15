module.exports = {
  "src/**/*.{ts,tsx}(x)": () => "tsc -p tsconfig.json --noEmit",
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write", "git add"]
};
