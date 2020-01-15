module.exports = {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write", "git add"],
  "src/**/*.{ts,tsx}(x)": () => "tsc -p tsconfig.json --noEmit"
};
