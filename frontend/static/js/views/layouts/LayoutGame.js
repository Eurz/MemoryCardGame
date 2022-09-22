import utilities from '../../functions/utilities.js'

export default class LayoutGame {
    constructor() {
        // this.root = document.querySelector('#app')
        // this.root.appendChild(this.createLayout())
    }

    createLayout() {
        const html = `
        <div class="container game-container">
            <header class="header">
                <a href="/" class="logo">Memory Card Game</a>
            </header>
            <main class="main">

                
            </main>
        </div>
		`

        return utilities.createFragment(html)
    }
}
