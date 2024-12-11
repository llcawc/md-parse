import './page.css'
import '../vendor/colormode.js'
import '../vendor/prism.js'
import { page } from './md/page.js'

const divApp = document.querySelector('#app')
divApp.innerHTML = page
