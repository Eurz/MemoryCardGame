import utilities from '../functions/utilities.js'

export default class ChooseDifficulty {
    constructor(callBack) {
        this.$wrapper = this.createLayout()
        this.callBack = callBack
        this.$buttonStart = this.$wrapper.querySelector('.btn-start')
        const buttons = this.$wrapper.querySelectorAll('.btn-difficulty')

        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                this.$buttonStart.classList.remove('btn-hide')
                const data = this.setDifficulty(e.target.id)
                this.setStorage(data)
                console.log(e.target.id)
                // button.classList.add('btn-fadeout')

                this.$buttonStart.addEventListener('click', () => {
                    this.callBack(data)
                })
            })
        })
    }

    setDifficulty(difficulty) {
        console.log('typeof', difficulty)
        let gameParams
        switch (difficulty) {
            case 'medium':
                gameParams = { tagName: 'Noob', maxTime: 60, maxStrokes: 10 }
                break
            case 'hard':
                gameParams = { tagName: 'Noob', maxTime: 45, maxStrokes: 8 }
                break
            case 'easy':
                gameParams = { tagName: 'Noob', maxTime: 90, maxStrokes: 15 }
                break

            default:
                gameParams = { tagName: 'Noob', maxTime: 120, maxStrokes: 30 }
                break
        }

        return gameParams
    }

    setStorage(data) {
        // const data = { tagName: 'Noob', difficulty }

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
