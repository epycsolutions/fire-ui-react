# Color Mode

React component that adds support for light mode and dark mode using
`localStorage` and `matchMedia`.

## Installation

```sh
npm i @fire-ui/color-mode
```

## Import component

To enable this behavior within your aps, wrap your application in a
`ColorModeProvider` below the `ThemeProvider`.

```jsx live=false
import * as React from 'react'

import { ColorModeProvider } from '@fire-ui/color-mode'
import theme from './theme'

function App({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <ColorModeProvider>{children}</ColorModeProvider>
        </ThemeProvider>
    )
}
```

Then you can use the hook `useColorMode` within your application.

```jsx
function ExampleThingyOrSo() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <header>
            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
        </header>
    )
}
```