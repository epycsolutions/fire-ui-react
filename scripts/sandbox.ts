import { findPackages } from 'find-packages'
import { promises as fs } from 'fs'

async function main() {
    const packages = await findPackages('packages')

    await Promise.all(
        packages.map(async (pkg) => {
            const files = await fs.readdir(`${ pkg.dir }/src`)
            const tsx = files.some((file) => file.endsWith('.tsx'))

            let data = {
                ...pkg.manifest,
                main: 'dist/index.cjs.js',
                module: 'dist/index.esm.js',
                scripts: {
                    ...pkg.manifest.scripts,
                    build: !tsx
                        ? 'tsup src/index.ts --dts'
                        : 'JSX=1 tsup src/index.ts --dts',
                    'build:fast': !tsx ? 'tsup src/index.ts' : 'JSX=1 tsup src/index.ts',
                    'dev': 'npm build -- --watch',
                },
            }

            return fs.writeFile(
                `${ pkg.dir }/package.json`,
                JSON.stringify(data, null, 2),
            )
        }),
    )
}

main()