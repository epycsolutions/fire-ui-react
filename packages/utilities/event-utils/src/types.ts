export type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent

export interface Point {
    x: number
    y: number
}

export interface PointerEventInfo {
    point: Point
}

export interface MixedEventListener {
    (event: AnyPointerEvent, info: PointerEventInfo): void
}

export type PointType = 'page' | 'client'