import checkNode from 'cli-check-node'
import welcome from 'cli-welcome'
import unhandledError from 'cli-handle-unhandled'

import updateNotifier from 'update-notifier'

import pkgJSON from '../../package.json'

export async function initCLI() {
    checkNode(`12`)

    await unhandledError()

    welcome({
        title: 'FireUI CLI',
        tagLine: `by FireUI\n${ pkgJSON.description }`,
        bgColor: `#333197`,
        color: '#FFFFFF',
        bold: true,
        clear: false,
        version: pkgJSON.version
    })

    updateNotifier({
        pkg: pkgJSON,
        shouldNotifyInNpmScript: true,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 3, // 3 days
    }).notify({ isGlobal: true })
}