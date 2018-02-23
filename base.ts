/**
 * A subset of 'React.CSSProperties' which only includes margins and paddings
 * (in their long form).
 */
export interface SpaceProperties {
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number

  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
}

/**
 * A union of string literals which describe all the possible variations
 * of spacing you want to support.
 */
export type Space<T> = keyof T

/**
 * An object which maps spaces to their CSS properties.
 */
export type SpaceRegistry<T> = {
  [k in Space<T>]: SpaceProperties
}

const lookupSpaceProperties = <T>(sr: SpaceRegistry<T>) => (sp: Space<T>): SpaceProperties => sr[sp]

/**
 * Merge multiple spaces into a single 'SpaceProperties' object. In simple
 * cases you can use object spread instead (eg. `{ ...ma2, ...pb4 }`).
 */
export const mergeSpaceProperties = <T>(sr: SpaceRegistry<T>) => (s: Array<Space<T>>): SpaceProperties =>
  Object.assign({}, ...s.map(lookupSpaceProperties(sr)))
