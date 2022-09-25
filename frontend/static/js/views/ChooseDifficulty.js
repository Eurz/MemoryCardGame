import utilities from '../functions/utilities.js'

export default class ChooseDifficulty {
    constructor(callBack) {
        this.$wrapper = this.createLayout()
        this.callBack = callBack
        const buttons = Array.from(
            this.$wrapper.querySelectorAll('.btn-difficulty')
        )

        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const data = this.setDifficulty(e.target.id)
                this.setStorage(data)
                const fadeDelay = 1000
                button.style.animationDuration = `${fadeDelay / 100}s`
                button.classList.add('btn-fadeout')
                const otherButtons = buttons.filter((currentButton) => {
                    return currentButton.id != button.id
                })
                otherButtons.forEach((button) => {
                    button.classList.add('btn-hide')
                })

                setTimeout(() => {
                    this.callBack(data)
                }, fadeDelay + 100)
            })
        })
    }

    setDifficulty(difficulty) {
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
            </div>
            `

        return utilities.createFragment(html)
    }

    getHtml() {
        return this.$wrapper
    }
}
