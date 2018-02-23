import * as React from 'react'
import { SpaceProperties, SpaceRegistry, Space, mergeSpaceProperties } from './base'

export interface SpaceHTMLAttributes {
  className?: string
  style?: React.CSSProperties
}

export type ToAttributes = (sp: SpaceProperties) => SpaceHTMLAttributes

export const spaceHTMLAttributes = (toAttributes: ToAttributes) => <T>(sr: SpaceRegistry<T>) => (s: Array<Space<T>>): SpaceHTMLAttributes =>
  toAttributes(mergeSpaceProperties(sr)(s))

export type SpaceProps<T> = {
  [k in Space<T>]?: boolean
}

export type SpacedProps<T> = SpaceProps<T> & { children?: React.ReactNode }
export type Spaced<T> = (props: SpacedProps<T>) => JSX.Element

export const mkSpaced = (toAttributes: ToAttributes) => <T>(sr: SpaceRegistry<T>) => (props: SpacedProps<T>): JSX.Element => {
  const { children, ...spaceProps } = props as any
  const spaces: Array<Space<T>> = keysof<SpaceProps<T>>(spaceProps)

  return React.createElement(
    'div',
    spaceHTMLAttributes(toAttributes)(sr)(spaces),
    ...React.Children.toArray(children)
  )
}

/** A typed version of Object.keys */
const keysof: <T>(o: T) => Array<keyof T> = Object.keys as any
