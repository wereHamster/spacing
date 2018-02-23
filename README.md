The goal of this package is to provide implementation of a generic spacing concept (paddings, margins) that is usable across projects.

This package is split into mutiple modules. Import the ones you need.

It contains with a ready-made space registry (which is based on tachyons.css). If it doesn't suite you, it's easy to create your own.

# Modules

  - `spacing/base`: Types and generic functions
  - `spacing/react`: React bindings
  - `spacing/default`: The default space registry (copied from tachyons.css)


# Usage

Import a space registry (eg. `spacing/default`) and use directly in React `style` attributes.

```
import { ma2, pb5 } from 'spacing/default'

<div style={{ ...ma2, ...pb5 }}>
</div>
```

Of course inline styles aren't nice, and you probably want to use the spaces along your favourite CSS-in-JS library. Because `SpaceProperties` is just a subset of `React.CSSProperties`, any function which accepts the later will work fine with this package. For example the `css()` functions from [glamor] or [emotion] should work out of the box.

```
import { css } from 'glamor'
import { ma2 } from 'spacing/default'

const redWithSlightMarginsAllAround = css({
  ...ma2,
  color: 'red',
})
```

This package also provides a [React] component to make it easier to wrap any existing components and give them space. Because we can not assume any particular CSS-in-JS implementation, this component is generic and you need to bind it with your choice, as well as the space registry you want to use.

```
import { css } from 'emotion'
import { Spaced, mkSpaced } from 'spacing/react'
import * as sr from 'spacing/default'

// Create a 'Spaced' component and bind it to emotion and the
// default space registry.
export const Spaced: Spaced<typeof sr> = mkSpaced(css)(sr)

// Wrap any component in <Spaced> to give it… uhm… a bit space.
<Spaced ma2 pb7>
  <h1>Good Habits</h1>
</Spaced>
```

[glamor]: https://github.com/threepointone/glamor
[emotion]: https://emotion.sh/
[React]: https://reactjs.org/
