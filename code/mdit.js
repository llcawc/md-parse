import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import markdownit from 'markdown-it'
const md = markdownit({ html: true })

const __dirname = path.resolve()

async function parse() {
  const file = await readFile(path.join(__dirname, 'src', 'md', 'page.md'), { encoding: 'utf8' })
  const result =
    '`<div class="max-w-[800px] mx-auto px-3 py-6 prose dark:prose-invert">' + md.render(file).toString() + '</div>`'
  const page = 'export const page =' + result
  const e = await writeFile(path.join(__dirname, 'src', 'md', 'page.js'), page)
  if (e) console.log('Error', e)
}

parse()
