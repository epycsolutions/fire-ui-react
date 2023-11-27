import fs from 'fs'
import path from 'path'

import { promisify } from 'util'

const exists = promisify(fs.exists)

export const themeInterfaceDestionation = [
    'node_modules',
    '@fire-ui',
    'styled-system',
    'dist',
    'theming.types.d.ts'
]

/**
 * Finds the target file to override
 * In our case it is located in the @fire-ui/styled-system package
 */
async function resolveThemingDefinitionPath(): Promise<string | undefined> {
    const baseDir = path.join('..', '..', '..')
    const cwd = process.cwd()

    const pathsToTry = [
        path.resolve(baseDir, '..', ...themeInterfaceDestionation),
        path.resolve(baseDir, '..', '..', ...themeInterfaceDestionation),
        path.resolve(cwd, ...themeInterfaceDestionation),
        path.resolve(cwd, '..', ...themeInterfaceDestionation),
        path.resolve(cwd, '..', '..', ...themeInterfaceDestionation)
    ]

    const triedPaths = await Promise.all(
        pathsToTry.map(async (possiblePath) => {
            if(await exists(possiblePath)) return possiblePath
            return ''
        })
    )

    return triedPaths.find(Boolean)
}

/**
 * Find the location of the default target file or resolve the given path
 */
export async function resolveOutputPath(
    overridePath?: string
): Promise<string> {
    if(overridePath) return path.resolve(process.cwd(), overridePath)

    const themingDefinitionFilePath = await resolveThemingDefinitionPath()
    if(!themingDefinitionFilePath) {
        throw new Error(
            'Could not find @fire-ui/styled-system in node_modules. Please provide `--out` parameter.'
        )
    }

    return themingDefinitionFilePath
}