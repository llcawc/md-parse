// md to html converter
import { readFile, writeFile } from 'node:fs/promises'
const __dirname = path.resolve()
import path from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

async function mdparse(cnt) {
  const result = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(cnt)
  return result.value
}

async function parse() {
  const file = await readFile(path.join(__dirname, 'src', 'md', 'page.md'), { encoding: 'utf8' })
  const htmlText = await mdparse(file)

  const e = await writeFile(path.join(__dirname, 'src', 'md', 'page.html'), htmlText.toString())
  if (e) console.log('Error', e)
}

parse()
