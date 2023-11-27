import { isObject } from '@fire-ui/shared-utils'
import { CSSVar } from './css-var'

export type Opperand = string | number | CSSVar
type Opperands = Opperand[]

type Operator = '+' | '-' | '*' | '/'

function toRef(opperand: Opperand): string {
    if(isObject(opperand) && opperand.reference) return opperand.reference
    return String(opperand)
}

const toExpr = (operator: Operator, ...opperands: Opperands) =>
    opperands.map(toRef).join(` ${ operator } `).replace(/calc/g, '')

const add = (...opperands: Opperands) => `calc(${ toExpr('+', ...opperands) })`
const subtract = (...opperands: Opperands) => `calc(${ toExpr('-', ...opperands) })`
const multiply = (...opperands: Opperands) => `calc(${ toExpr('*', ...opperands) })`
const divide = (...opperands: Opperands) => `calc(${ toExpr('/', ...opperands) })`

const negate = (x: Opperand) => {
    const value = toRef(x)

    if(value != null && !Number.isNaN(parseFloat(value))) {
        return String(value).startsWith('-') ? String(value).slice(1) : `-${ value }`
    }

    return multiply(value, -1)
}

export interface CalcChain {
    add: (...opperands: Opperands) => CalcChain
    subtract: (...opperands: Opperands) => CalcChain
    multiply: (...opperands: Opperands) => CalcChain
    divide: (...opperands: Opperands) => CalcChain
    negate: () => CalcChain
    toString: () => string
}

export const calc = Object.assign(
    (x: Opperand): CalcChain  => ({
        add: (...opperands) => calc(add(x, ...opperands)),
        subtract: (...opperands) => calc(subtract(x, ...opperands)),
        multiply: (...opperands) => calc(multiply(x, ...opperands)),
        divide: (...opperands) => calc(divide(x, ...opperands)),
        negate: () => calc(negate(x)),
        toString: () => x.toString()
    }), {
        add,
        subtract,
        multiply,
        divide,
        negate
    }
)