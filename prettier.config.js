module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['react', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: false,
  singleQuote: true,
};
