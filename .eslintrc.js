module.exports = {
  root: true,
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  semi: [2, 'always'],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
