import marked from './marked.js'

/**
 * parse md files in to html on base layout,
 * extname layout is offer extname outfile,
 * content from md file isert in "{{ slug }}"
 * @params parse(sourse file: string, out dir?: string, layot file?: string)
 */

marked('./src/md/page.md', './src/md', './src/layouts/app.js')
marked('./src/md/pagefull.md', './src/md', './src/layouts/app.js')
