import { findPackages } from 'find-packages'
import { promises as fs } from 'fs'

async function main() {
    const packages = await findPackages('hooks')

    await Promise.all(
        packages.map(async (pkg) => {
            const data = {
                extends: '../../../tsconfig.json',
                include: ['src', 'index.ts']
            }

            return fs.writeFile(
                `${ pkg.dir }/tsconfig.json`,
                JSON.stringify(data, null, 2)
            )
        }),
    )
}

main()