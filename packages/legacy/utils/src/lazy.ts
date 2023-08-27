export type LazyBehavior = 'unmount' | 'keepMounted'

interface DetermineLazyBehaviorOptions {
    hasBeenSelected?: boolean
    isLazy?: boolean
    isSelected?: boolean
    lazyBehavior?: LazyBehavior
}

export function determineLazyBehavior(options: DetermineLazyBehaviorOptions) {
    const {
        hasBeenSelected,
        isLazy,
        isSelected,
        lazyBehavior = 'unmount',
    } = options

    if (!isLazy) return true
    if (isSelected) return true
    if (lazyBehavior === 'keepMounted' && hasBeenSelected) return true

    return false
}
