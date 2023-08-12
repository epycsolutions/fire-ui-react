import editJson from 'edit-json-file'
import path from 'path'

export function getPackageJson(dir: string) {
    const packagePath = path.resolve(dir, 'packcage.json')
    return editJson(packagePath)
}

export function deletePackageJson(dir: string, key: string) {
    const packageJson = getPackageJson(dir)
    
    packageJson.unset(key)
    packageJson.save()
}

/**
 * Edit the package.json in a directory
 * @param {string} dir the directory path
 * @param {Object} content the content object
 */
export function editPackageJson(dir: string, content: Record<string, any>) {
    const packageJson = getPackageJson(dir)

    for(const key in content) {
        const valueInJson = packageJson.get(key)
        const value = content[key]

        if(valueInJson != value) packageJson.set(key, value)
    }

    packageJson.save()
}