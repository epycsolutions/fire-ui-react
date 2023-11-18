export function isElement(element: any): element is Element {
    return (
        element != null &&
        typeof element === 'object' &&
        'nodeType' in element &&
        element.nodeType === Node.ELEMENT_NODE
    )
}

export function isHTMLElement(element: any): element is HTMLElement {
    if(!isElement(element)) return false
    const win = element.ownerDocument.defaultView ?? window

    return element instanceof win.HTMLElement
}

export function getOwnerWindow(node?: Element | null): typeof globalThis {
    return getOwnerDocument(node)?.defaultView ?? window
}

export function getOwnerDocument(node?: Element | null): Document {
    return isElement(node) ? node.ownerDocument : document
}

export function getEventWindow(event: Event) {
    return ((event as UIEvent).view ?? window) as typeof window
}

export function isBrowser() {
    return Boolean(globalThis?.document)
}

export function getActiveElement(node?: HTMLElement) {
    return getOwnerDocument(node).activeElement as HTMLElement
}

export function contains(parent: HTMLElement | null, child: HTMLElement) {
    if(!parent) return false
    return parent === child || parent.contains(child)
}