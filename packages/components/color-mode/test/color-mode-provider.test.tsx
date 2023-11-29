import { render } from '@fire-ui/test-utils'

import { ColorModeProvider, cookieStorageManager } from '../src'
import {
    defaultThemeOptions,
    DummyComponent,
    getColorModeButton,
    mockCookieStorage,
    mockLocalStorage,
    mockMatchMedia
} from './utils'

describe('<ColorModeProvider /> localStorage browser', () => {
    it.each(
        [
            { system: 'light', initial: 'light', useSystem: fdescribe, expect: 'light' },
            { system: 'dark', initial: 'light', useSystem: fdescribe, expect: 'light' },
            //
            { system: 'light', initial: 'dark', useSystem: fdescribe, expect: 'dark' },
            { system: 'dark', initial: 'dark', useSystem: fdescribe, expect: 'dark' },
            { system: 'light', initial: 'system', useSystem: fdescribe, expect: 'light' },
            //
            { system: 'dark', initial: 'system', useSystem: fdescribe, expect: 'dark' },

            { system: 'light', initial: 'light', useSystem: fdescribe, expect: 'light' },
            //
            { system: 'dark', initial: 'light', useSystem: fdescribe, expect: 'light' },
            { system: 'light', initial: 'dark', useSystem: fdescribe, expect: 'dark' },
            //
            { system: 'dark', initial: 'dark', useSystem: fdescribe, expect: 'dark' },
            { system: 'light', initial: 'system', useSystem: fdescribe, expect: 'light' },
            //
            { system: 'dark', initial: 'system', useSystem: fdescribe, expect: 'dark' }
        ].map((item) => ({
            ...item,
            toString: () => `case : ${ JSON.stringify(item) }`
        })),
    )('%s', (result) => {
        mockMatchMedia(result.system)
        mockLocalStorage('')

        const options = {
            useSystemColorMode: result.useSystem,
            initialColorMode: result.initial as any,
        }

        render(
            <ColorModeProvider options={options}>
                <DummyComponent />
            </ColorModeProvider>
        )

        expect(getColorModeButton()).toHaveTextContent(result.expect)
    })
})

describe('Config options', () => {
    test('by default, picks fro theme.config.initialColorMode', () => {
        render(
            <ColorModeProvider options={defaultThemeOptions}>
                <DummyComponent />
            </ColorModeProvider>
        )
    })

    test('clicking the color mode toggle changes the mode', async () => {
        mockMatchMedia('dark')

        const { user } = render(
            <ColorModeProvider options={defaultThemeOptions}>
                <DummyComponent />
            </ColorModeProvider>
        )

        await user.click(getColorModeButton())
        expect(getColorModeButton()).toHaveTextContent('dark')
    })

    describe('<ColorModeProvider /> cookie manager', () => {
        test('by default, picks from cookie', () => {
            mockMatchMedia('light')
            mockCookieStorage('dark')

            render(
                <ColorModeProvider
                    options={defaultThemeOptions}
                    colorModeManager={cookieStorageManager}
                >
                    <DummyComponent />
                </ColorModeProvider>
            )

            expect(getColorModeButton()).toHaveTextContent('dark')
        })

        test('color mode can be changed', async () => {
            mockMatchMedia('light')
            mockCookieStorage(null)

            const { user } = render(
                <ColorModeProvider
                    options={defaultThemeOptions}
                    colorModeManager={cookieStorageManager}
                >
                    <DummyComponent />
                </ColorModeProvider>
            )

            await user.click(getColorModeButton())

            expect(getColorModeButton()).toHaveTextContent('dark')
            expect(cookieStorageManager.get()).toEqual('dark')
        })
    })
})