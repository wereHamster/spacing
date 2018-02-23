const fs = require('fs')
const path = require('path')
const { breakpoints, properties, sides, spaces } = require('./config')

/**
 * Write to file
 */
const allSpacingCombinations = mkSpacingCombinations(properties, sides, spaces)

generate('default.ts', write => {
  write("\nimport { SpaceProperties } from './base'\n")
  Object.keys(allSpacingCombinations).forEach(k => {
    write('\n')
    write(`export const ${k}: SpaceProperties = ${JSON.stringify(allSpacingCombinations[k], null, 2).replace(/"/gi, '\'')}\n`)
  })
})

/**
 * Helpers
 */
function generate (filename, f) {
  const stream = fs.createWriteStream(path.join(__dirname, filename))
  stream.write(`// !!! THIS FILE IS GENERATED BY ${path.basename(__filename)} !!!\n`)
  f(x => stream.write(x))
  stream.end()
}

function mkBreakpoint (name, mq) {
  return `
export const ${name} = (strings: TemplateStringsArray, ...args: Array<any>): string => {
  return css\`
    @media ${mq} {
      \${css(strings, ...args)}
    }
  \`
}
`
}

function mkSpacingCombinations (properties, sides, spaces) {
  return Object.keys(properties).reduce((acc, propIdx) => {
    const prop = properties[propIdx]
    Object.keys(sides).forEach(sideIdx => {
      const sideProps = sides[sideIdx]
      spaces.forEach((space, spaceIdx) => {
        const shorthand = `${propIdx}${sideIdx}${spaceIdx}`
        acc[shorthand] = sideProps.reduce((m, sp) => {
          m[`${prop}${sp}`] = space
          return m
        }, {})
      })
    })
    return acc
  }, {})
}
