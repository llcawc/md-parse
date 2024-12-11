import { readFile, writeFile } from 'node:fs/promises'
import { resolve, join, dirname, basename, extname } from 'node:path'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

/**
 * parse md files in to html on base layout,
 * extname layout is offer extname outfile,
 * content from md file isert in "{{ slug }}"
 * @params parse(sourse file: string, out dir?: string, layot file?: string)
 */
export default async function parse(fileMd, outDir = null, fileLayout = null, options = null) {
  try {
    if (options) {
      marked.use(options)
    }

    const mdFile = fileMd ? resolve(fileMd) : null
    if (!mdFile) {
      throw new Error('File to parse not found!')
    }

    const distDir = outDir ? resolve(outDir) : null
    const layoutFile = fileLayout ? resolve(fileLayout) : null

    const mdDir = dirname(mdFile)
    const mdName = basename(mdFile)

    const file = await readFile(join(mdDir, mdName), { encoding: 'utf8' })
    const htmlText = await marked.parse(file.toString())
    const sanitizeText = DOMPurify.sanitize(htmlText.toString())

    if (layoutFile) {
      const ext = extname(layoutFile)
      const newName = mdName.replace(/(.*?)[.].*/i, '$1' + ext)
      const layout = await readFile(layoutFile, { encoding: 'utf8' })
      const newFile = layout.replace(/{{\s?slug\s?}}/i, sanitizeText.toString())

      if (distDir) {
        await writeFile(join(distDir, newName), newFile)
      } else {
        await writeFile(join(mdDir, newName), newFile)
      }
    } else {
      const newName = mdName.replace(/(.*?)[.].*/i, '$1.html')
      if (distDir) {
        await writeFile(join(distDir, newName), sanitizeText.toString())
      } else {
        await writeFile(join(mdDir, newName), sanitizeText.toString())
      }
    }
  } catch (error) {
    console.error(error)
  }
}
