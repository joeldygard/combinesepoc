import { readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(projectRoot, 'dist')
const serverDirectory = resolve(projectRoot, '.prerender')
const serverEntry = resolve(serverDirectory, 'entry-server.js')

try {
  const { prerenderTargets, render } = await import(pathToFileURL(serverEntry).href)

  for (const target of prerenderTargets) {
    const relativePath = target.path === '/' ? 'index.html' : `${target.path}index.html`
    const outputPath = resolve(outputDirectory, relativePath.replace(/^\//, ''))
    const document = await readFile(outputPath, 'utf8')
    const marker = '<div id="root"></div>'

    if (!document.includes(marker)) {
      throw new Error(`Could not find an empty root in ${outputPath}`)
    }

    const { html } = render(target.route)
    const prerendered = document.replace(
      marker,
      () => `<div id="root">${html}</div>`,
    )
    await writeFile(outputPath, prerendered, 'utf8')
  }
} finally {
  await rm(serverDirectory, { recursive: true, force: true })
}
