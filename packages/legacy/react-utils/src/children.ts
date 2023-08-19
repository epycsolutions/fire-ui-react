import React, { Children, isValidElement } from 'react'

export function getValudChildren(children: React.ReactNode) {
    return Children
        .toArray(children)
        .filter((child) => isValidElement(child)) as React.ReactElement[]
}