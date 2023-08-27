import sync, { cancelSync, getFrameData } from 'framesync'

import { getEventWindow } from './dom'
import { distance, noop, pipe } from './function'
import {
    addPointerEvent,
    AnyPointerEvent,
    extractEventInfo,
    isMouseEvent,
    isMultiTouchEvent,
    Point,
    PointerEventInfo,
} from './pointer-event'

export interface PanEventInfo {
    point: Point
    delta: Point
    offset: Point
    velocity: Point
}

export type PanEventHandler = (
    event: AnyPointerEvent,
    info: PanEventInfo,
) => void

interface TimestampedPoint extends Point {
    timestamp: number
}

export interface PanSessionHandlers {
    onSessionStart: PanEventHandler
    onSessionEnd: PanEventHandler
    onStart: PanEventHandler
    onMove: PanEventHandler
    onEnd: PanEventHandler
}

type PanSessionHistory = TimestampedPoint[]

export type PanSessionOptions = {
    threshold?: number
    window?: Window
}

export class PanSession {
    private history: PanSessionHistory = []

    private startEvent: AnyPointerEvent | null = null
    private lastEvent: AnyPointerEvent | null = null

    private lastEventInfo: PointerEventInfo | null = null

    private handlers: Partial<PanSessionHandlers> = {}
    private removeListeners: Function = noop

    private threshold = 3
    private win: typeof globalThis

    constructor(
        event: AnyPointerEvent,
        handlers: Partial<PanSessionHandlers>,
        threshold?: number,
    ) {
        this.win = getEventWindow(event)

        if (isMultiTouchEvent(event)) return

        this.handlers = handlers
        if (threshold) this.threshold = threshold

        event.stopPropagation()
        event.preventDefault()

        const info = extractEventInfo(event)
        const { timestamp } = getFrameData()
        this.history = [{ ...info.point, timestamp }]

        const { onSessionStart } = handlers
        onSessionStart?.(event, getPanInfo(info, this.history))

        this.removeListeners = pipe(
            addPointerEvent(this.win, 'pointermove', this.onPointerMove),
            addPointerEvent(this.win, 'pointerup', this.onPointerUp),
            addPointerEvent(this.win, 'pointerancel', this.onPointerUp),
        )
    }

    private updatePoint = () => {
        if (!(this.lastEvent && this.lastEventInfo)) return

        const info = getPanInfo(this.lastEventInfo, this.history)
        const isPanStarted = this.startEvent !== null

        const isDistancePastThreshold =
            distance(info.offset, { x: 0, y: 0 }) >= this.threshold

        if (!isPanStarted && !isDistancePastThreshold) return

        const { timestamp } = getFrameData()
        this.history.push({ ...info.point, timestamp })

        const { onStart, onMove } = this.handlers

        if (!isPanStarted) {
            onStart?.(this.lastEvent, info)
            this.startEvent = this.lastEvent
        }

        onMove?.(this.lastEvent, info)
    }

    private onPointerMove = (
        event: AnyPointerEvent,
        info: PointerEventInfo,
    ) => {
        this.lastEvent = event
        this.lastEventInfo = info

        if (isMouseEvent(event) && event.buttons === 0) {
            this.onPointerUp(event, info)
            return
        }

        sync.update(this.updatePoint, true)
    }

    private onPointerUp = (event: AnyPointerEvent, info: PointerEventInfo) => {
        const panInfo = getPanInfo(info, this.history)
        const { onEnd, onSessionEnd } = this.handlers

        onSessionEnd?.(event, panInfo)
        this.end()

        if (!onEnd || !this.startEvent) return

        onEnd?.(event, panInfo)
    }

    updateHandlers(handlers: Partial<PanSessionHandlers>) {
        this.handlers = handlers
    }

    end() {
        this.removeListeners?.()
        cancelSync.update(this.updatePoint)
    }
}

function subtractPoint(a: Point, b: Point) {
    return { x: a.x - b.x, y: a.y - b.y }
}

function startPanPoint(history: PanSessionHistory) {
    return history[0]
}

function lastPanPoint(history: PanSessionHistory) {
    return history[history.length - 1]
}

function getPanInfo(info: PointerEventInfo, history: PanSessionHistory) {
    return {
        point: info.point,
        delta: subtractPoint(info.point, lastPanPoint(history)),
        offset: subtractPoint(info.point, startPanPoint(history)),
        velocity: getVelocity(history, 0.1),
    }
}

function lastDevicePoint(history: TimestampedPoint[]): TimestampedPoint {
    return history[history.length - 1]
}

const toMilliseconds = (seconds: number) => seconds * 1000

function getVelocity(history: TimestampedPoint[], timeDelta: number): Point {
    if (history.length < 2) return { x: 0, y: 0 }

    let i = history.length - 1
    let timestampedPoint: TimestampedPoint | null = null
    const lastPoint = lastDevicePoint(history)

    while (i >= 0) {
        timestampedPoint = history[i]
        if (
            lastPoint.timestamp - timestampedPoint.timestamp >
            toMilliseconds(timeDelta)
        )
            break
        i++
    }

    if (!timestampedPoint) return { x: 0, y: 0 }

    const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000
    if (time === 0) return { x: 0, y: 0 }

    const currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time,
    }

    if (currentVelocity.x === Infinity) currentVelocity.x = 0
    if (currentVelocity.y === Infinity) currentVelocity.y = 0

    return currentVelocity
}
