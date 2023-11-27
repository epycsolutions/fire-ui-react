import { useColorModeValue } from '../src'

export default {
    title: 'System / Color Mode'
}

export const BasicExample = () => {
    const colorMode = useColorModeValue('Light', 'Dark')
    return <code>Code mode is: {colorMode}</code>
}