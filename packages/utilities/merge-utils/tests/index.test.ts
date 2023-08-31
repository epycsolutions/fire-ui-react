import { mergeWith } from '../src'

describe('Merge utils', () => {
    test('Should work', () => {
        const result = mergeWith(
            { parts: ['a'], baseStyle: () => ({ background: 'red.200' }) },
            {
                parts: ['b'],
                baseStyle: () => ({ color: 'pink', background: 'red.500' }),
            },
        )

        expect(result.baseStyle({})).toMatchInlineSnapshot(`
            Object {
                'background': 'red.500',
                'color': 'pink',
            }
        `)

        expect(result.parts).toMatchInlineSnapshot(`
            Array [
                'a',
                'b'
            ]
        `)
    })
})
