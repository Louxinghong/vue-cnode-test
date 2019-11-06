import { camelCase } from 'lodash'

const requireFilters = require.context('.', false, /^((?!index).)*.js$/)
const filters = requireFilters.keys().reduce((total, path) => {
  const module = requireFilters(path)
  const name = camelCase(path.replace(/(\.\/|\.js)/g, ''))

  total[name] = module.default || module

  return total
}, {})

export default filters
