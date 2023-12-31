import { findPackages } from 'find-packages'
import path from 'path'
import { promises as fs } from 'fs'

async function main() {
    const packages = await findPackages(process.cwd(), {
        includeRoot: false,
        patterns: [ 'packages/**', 'hooks/**', 'utilities/**' ]
    })

    const packageList = packages.map((pkg) => path.relative(process.cwd(), pkg.dir))

    const FILE = '.codesandbox/ci.json'

    const content = await fs.readFile(FILE, 'utf8')
    const json = { ...JSON.parse(content), packageList }

    await fs.writeFile(FILE, JSON.stringify(json, null, 2))
}

main()