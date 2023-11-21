import { isTouchEvent } from './assertion'
import { AnyPointerEvent, PointType } from './types'

function pointFromTouch(event: TouchEvent, type: PointType = 'page') {
    const point = event.touches[0] || event.changedTouches[0]
    return { x: point[ `${ type }X` ], y: point[ `${ type }Y` ] }
}

function pointFromMouse(
    point: MouseEvent | PointerEvent,
    type: PointType = 'page'
) {
    return {
        x: point[ `${ type }X` ],
        y: point[ `${ type }Y` ]
    }
}

export function getEventPoint(
    event: AnyPointerEvent,
    type: PointType = 'page'
) {
    return isTouchEvent(event)
        ? pointFromTouch(event, type)
        : pointFromMouse(event, type)
}