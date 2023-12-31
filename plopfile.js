const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const camelCase = (string) => {
    return string.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
}

const workspaces = [ 'components', 'hooks', 'utilities', 'integrations' ]

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function main(plop) {
    plop.setHelper('capitalize', (text) => {
        return capitalize(camelCase(text))
    })

    plop.setGenerator('component', {
        description: 'Generates a component package',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message: 'Enter component name:'
            },
            {
                type: 'input',
                name: 'description',
                message: 'The description of this component:'
            },
            {
                type: 'list',
                name: 'outDir',
                message: 'Where should this component or package live?',
                default: 'packages',
                choices: workspaces
            },
        ],
        actions(answers) {
            const actions = [ ]
            if(!answers) return actions

            const { componentName, description, outDir } = answers

            actions.push({
                type: 'addMany',
                templateFiles: 'plop/component/**',
                destination: `./packages/{{ outDir }}/{{ dashCase componentName }}`,
                base: 'plop/component',
                data: { description, componentName, outDir },
                abortOnFail: true
            })

            return actions
        }
    })
}