module.exports = (env) => {
  return {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
      ...(env.mode === 'production' ? { cssnano: {} } : {})
    }
  }
}
