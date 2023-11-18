import { isHTMLElement } from './dom'

function isScrollParent(element: HTMLElement): boolean {
    const win = element.ownerDocument.defaultView || window
    const { overflow, overflowX, overflowY } = win.getComputedStyle(element)

    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)
}

function getParent(element: HTMLElement): HTMLElement {
    if(element.localName === 'html') return element
    return element.assignedSlot || element.parentElement || element.ownerDocument.documentElement
}

export function getScrollParent(element: HTMLElement): HTMLElement {
    if([ 'html', 'body', '#document' ].includes(element.localName)) {
        return element.ownerDocument.body
    }

    if(isHTMLElement(element) && isScrollParent(element)) return element

    return getScrollParent(getParent(element))
}