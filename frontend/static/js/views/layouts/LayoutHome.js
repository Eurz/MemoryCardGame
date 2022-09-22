import utilities from '../../functions/utilities.js'

export default class LayoutHome {
    constructor() {
        // this.root = document.querySelector('#app')
        // this.root.appendChild(this.createLayout())
    }

    createLayout() {
        const html = `
        <div class="container home-container">
            <div class="home">
                <h1>Memory Card Game</h1>
                <div class="btn-wrapper">
                    <a href="/game" class="btn btn-start">Start game</a>
                </div>
            </div>
        </div>
		`

        // return utilities.createFragment(html)
        return utilities.createFragment(html)
    }
}
