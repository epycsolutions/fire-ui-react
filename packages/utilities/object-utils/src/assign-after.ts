export function assignAfter(target: Record<string, any>, ...sources: any[]) {
    if (target == null)
        throw new TypeError('Cannot convert undefined or null to object')

    const result: Record<string, unknown> = { ...target }
    for (const nextSource of sources) {
        if (nextSource == null) continue

        for (const nextKey in nextSource) {
            if (!Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                continue
            if (nextKey in result) delete result[nextKey]

            result[nextKey] = nextSource[nextKey]
        }
    }

    return result
}
