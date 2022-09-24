import utilities from '../functions/utilities.js'

export default class ChooseDifficulty {
    constructor() {
        this.$wrapper = this.createLayout()
        this.$buttonStart = this.$wrapper.querySelector('.btn-start')
        this.init()
    }

    init() {
        const buttons = this.$wrapper.querySelectorAll('.btn-difficulty')
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.setStorage(e.target.id)
                this.$buttonStart.classList.remove('btn-hide')
                console.log(e.target.id)
            })
        })
    }

    setStorage(difficulty) {
        const data = { tagName: 'Noob', difficulty }

        localStorage.setItem('mkgame', JSON.stringify(data))
    }

    createLayout() {
        const html = `
            <div>
                <div class="difficulty">
                    <button class="btn btn-difficulty" id="easy">Easy</button>
                    <button class="btn btn-difficulty" id="medium">Medium</button>
                    <button class="btn btn-difficulty" id="hard">Hard</button>
                </div>
                <div>
                <br/>
                    <button class="btn btn-start btn-hide">Start</button>
                </div>
                </div>
            `

        return utilities.createFragment(html)
    }

    getHtml() {
        return this.$wrapper
    }
}
