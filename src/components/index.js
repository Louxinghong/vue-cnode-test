const requireComponents = require.context('.', true, /\.vue$/)
const components = requireComponents.keys().reduce((total, path) => {
  const module = requireComponents(path)
  const component = module.default || module
  const { name, global } = component

  if (global) {
    total[name] = component
  }
  console.log(total)
  return total
}, {})

export default components
