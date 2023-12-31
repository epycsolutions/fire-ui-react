# @fire-ui/styled-system

The framework's agnostic styling engine for FireUI. It's used in the `system`
package.

## Installation

```sh
npm i @fire-ui/styled-system
```

### CSS Logical Properties

FireUI provides pretty good support for bidirectional (`bidi`) CSS
properties. For our shorthand proiops we Provide a `*Bidi` suffix to manage the
rtl / ltr switching.

```jsx
import { css } from '@fire-ui/styled-system'

const theme = {
    direction = 'rtl', // rtl | ltr
}

const styles = css({
    mt: '40px'
    // bi-directional `margin-right`
    // `margin-right` in ltr & `margin-left` in rtl
    mrBidi: '30px'
})(theme)
```

### References

```js
const cssLogicalValueMap = {
  float: { left: 'inline-start', right: 'inline-end' },
  clear: { left: 'inline-start', right: 'inline-end' },
  resize: { horizontal: 'block', vertical: 'inline' },
  textAlign: { left: 'start', right: 'end' },
  captionSize: { top: 'block-start', bottom: 'block-end' },
}

const cssLogicalPropertiesMap = {
  // Margin and Padding Logical Properties
  'marginTop|mt': 'marginBlockStart',
  'marginLeft|ml': 'marginInlineStart',
  'marginRight|mr': 'marginInlineEnd',
  'marginBottom|mb': 'marginBlockEnd',
  'paddingTop|pt': 'paddingBlockStart',
  'paddingBottom|pb': 'paddingBlockEnd',
  'paddingLeft|pl': 'paddingInlineStart',
  'paddingRight|pr': 'paddingInlineEnd',
  'marginY|my': 'marginBlock',
  'marginX|mx': 'marginInline',
  'paddingY|py': 'paddingBlock',
  'paddingX|px': 'paddingInline',

  // Floating and positioning logical properties
  top: 'insetBlockStart',
  bottom: 'insetBlockEnd',
  left: 'insetInlineStart',
  right: 'insetInlineEnd',

  // Sizing Logical properties
  'width|w': 'inlineSize',
  'minW|minWidth': 'minInlineSize',
  'maxW|maxWidth': 'maxInlineSize',
  'height|h': 'blockSize',
  'minH|minHeight': 'minBlockSize',
  'maxH|maxHeight': 'maxBlockSize',

  // Border logical properties
  borderY: 'borderBlock',
  borderX: 'borderInline',

  borderTop: 'borderBlockStart',
  borderTopWidth: 'borderBlockStartWidth',
  borderTopStyle: 'borderBlockStartStyle',
  borderTopColor: 'borderBlockStartColor',

  borderBottom: 'borderBlockEnd',
  borderBottomWidth: 'borderBlockEndWidth',
  borderBottomStyle: 'borderBlockEndStyle',
  borderBottomColor: 'borderBlockEndColor',

  borderLeft: 'borderInlineStart',
  borderLeftWidth: 'borderInlineStartWidth',
  borderLeftStyle: 'borderInlineStartStyle',
  borderLeftColor: 'borderInlineStartColor',

  borderRight: 'borderInlineEnd',
  borderRightWidth: 'borderInlineEndWidth',
  borderRightStyle: 'borderInlineEndStyle',
  borderRightColor: 'borderInlineEndColor',
}
```
