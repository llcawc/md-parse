import './main.css'
import '../vendor/colormode.js'
import { page } from './md/pagefull.js'

const divApp = document.querySelector('#app')
divApp.innerHTML = page
