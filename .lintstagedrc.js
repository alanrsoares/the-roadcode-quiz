module.exports = {
  "src/**/*.{ts,tsx}(x)": x => {
    console.log(x);
    return "tsc -p tsconfig.json --noEmit";
  },
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write", "git add"]
};
