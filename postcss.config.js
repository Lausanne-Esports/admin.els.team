const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postCSSImport = require('postcss-import')
const purgeCSS = require('@fullhuman/postcss-purgecss')

const isProduction = process.env.NODE_ENV === 'production'

const productionPlugins = [
  purgeCSS({
    content: [
      './pages/**/*.vue',
      './pages/**/*.tsx',
      './layouts/**/*.vue',
      './layouts/**/*.tsx',
      './components/**/*.vue',
      './components/**/*.tsx',
    ],
    whitelist: ['body', 'html', '__nuxt', '__layout'],
    whitelistPatternsChildren: [
      /flatpickr/,
      /iziToast/,
      /CodeMirror/,
      /cm/,
      /separator/,
      /editor/,
      /m[xybtlr]{1}-[0-9]{1,2}/,
      /p[xybtlr]{1}-[0-9]{1,2}/,
      /svg/,
    ],
    extractors: [
      {
        extractor: class TailwindExtractor {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_:/]+/g) || []
          }
        },
        extensions: ['css', 'html', 'vue'],
      },
    ],
  }),
]

module.exports = {
  plugins: [postCSSImport(), tailwind(), autoprefixer()].concat(
    isProduction ? productionPlugins : []
  ),
}
