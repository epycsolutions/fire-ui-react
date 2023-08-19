import { determineLazyBehavior } from '../src'

test('determineLazyBehavior', () => {
    expect(determineLazyBehavior({ isLazy: false })).toBe(true)
    expect(determineLazyBehavior({ isLazy: false, isSelected: false })).toBe(true)
    expect(determineLazyBehavior({ isLazy: false, hasBeenSelected: false })).toBe(true)

    expect(determineLazyBehavior({ isLazy: false, lazyBehavior: 'unmount' })).toBe(true)

    expect(determineLazyBehavior({ isLazy: true, lazyBehavior: 'unmount' })).toBe(false)

    expect(determineLazyBehavior({ isLazy: true, lazyBehavior: 'keepMounted', hasBeenSelected: true, isSelected: false })).toBe(true)

    expect(determineLazyBehavior({ isLazy: true, lazyBehavior: 'unmount', isSelected: true })).toBe(true)
    expect(determineLazyBehavior({ isLazy: true, lazyBehavior: 'unmount', isSelected: true, hasBeenSelected: true })).toBe(false)

    expect(determineLazyBehavior({ isLazy: true, isSelected: true })).toBe(true)

    expect(determineLazyBehavior({ isLazy: true, isSelected: false, hasBeenSelected: true, lazyBehavior: 'keepMounted' })).toBe(true)

    expect(determineLazyBehavior({ isLazy: true })).toBe(false)
})