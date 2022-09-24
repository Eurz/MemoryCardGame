import { getCards, getSoundsList } from '../data.js'
import { soundsPack } from '../functions/sounds.js'
import utilities from '../functions/utilities.js'
import Sounds from '../libs/Sounds.js'
import CardGame from '../views/CardGame.js'
import ChooseDifficulty from '../views/ChooseDifficulty.js'
import Message from '../views/Message.js'
import AbstractView from './AbstractView.js'

export default class Game extends AbstractView {
    constructor() {
        super()
        this.cardsName = []
        this.maxStrokes = 10
        this.maxCards = 8
        this.strokes = 0
        this.score = 0
        this.timeMax = 60
        this.counter = this.timeMax
        this.timer = null
        this.$wrapper = this.createLayout()
        this.$cardsWrapper = this.$wrapper.querySelector('.cards')
        this.cardOne = this.cardTwo = null
        this.isMatching = false

        this.soundsList = soundsPack(getSoundsList())
        this.music = this.playSound('music', { loop: true, volume: 0.5 })
        this.chooseDifficulty()
    }

    chooseDifficulty = () => {
        const data = localStorage.getItem('mkgame')

        if (!data) {
            console.log('Pas de données')
            this.$cardsWrapper.innerHTML = ''

            const currentMessage = `<h2>Choose your destiny</h2>`
            const message = new Message(currentMessage)

            const chooseDifficulty = new ChooseDifficulty()
            const buttonStart = chooseDifficulty.$buttonStart
            buttonStart.addEventListener('click', this.createGame)

            message.$wrapper.appendChild(chooseDifficulty.getHtml())

            buttonStart.addEventListener('click', () => {
                message.remove()
            })

            this.$wrapper
                .querySelector('.cards-wrapper')
                .append(message.getHtml())
        } else {
            this.createGame()
        }
    }
    /**
     * Init a new game
     */
    createGame = async () => {
        const data = await getCards()
        this.cardsName = data
        this.cardsName.length / 2
        this.score = 0
        this.strokes = 0
        this.isMatching = false
        this.counter = this.timeMax
        this.updateScore()

        this.$timeBar = this.$wrapper.querySelector('.bar')
        this.$timeBar.classList.add('start')
        this.$timeBar.style.animationPlayState = 'running'
        this.$timeBar.style.animationDuration = `${this.timeMax}s`

        const timeLeft = this.$wrapper.querySelector('.time-left span')
        timeLeft.textContent = `${this.timeMax}s`
        const params = { loop: true, volume: 0.3 }
        const titac = this.playSound('tictacclock', params)

        this.timer = setInterval(() => {
            const barWidth = this.$timeBar.offsetWidth

            this.counter--
            timeLeft.textContent = `${this.counter}s`
            if (this.counter === 0) {
                clearInterval(this.timer)
                this.soundsList['tictacclock'].pause()

                this.checkScore()
            }
        }, 1000)

        // this.$cardsWrapper.innerHTML = ''

        this.cards = this.cardsName.map((name, index) => {
            const card = new CardGame(name)
            const template = card.getHtml()
            template.dataset.id = index

            card.$wrapper.addEventListener('click', () => {
                this.onHandleClick(card)
            })

            setTimeout(() => {
                template.classList.add('show')
            }, 100 * index)

            this.$cardsWrapper.appendChild(card.$wrapper)

            return card
        })
    }

    /**
     *
     * @param {Object} card - Event when a card is clicked
     */
    onHandleClick = (card) => {
        if (!card.isVisible) {
            this.matchCard(card)
            card.flipCard()
            this.playSound('click')
            // this.soundsList.click.play()
        }
    }

    /**
     * Check if maxStrokes or maxCards are reached
     */
    checkScore() {
        let currentMessage

        if (this.score === this.maxCards - 1) {
            this.playSound('finishim')
            // this.soundsList.finishim.play()
        }

        if (
            this.strokes >= this.maxStrokes ||
            this.score === this.maxCards ||
            this.counter === 0
        ) {
            localStorage.removeItem('mkgame')
            this.$timeBar.style.animationPlayState = 'paused'
            const barWidth = this.$timeBar.offsetWidth
            this.$timeBar.style.width = `${barWidth}px`
            this.$timeBar.classList.remove('start')
            this.soundsList['tictacclock'].pause()

            if (this.strokes >= this.maxStrokes || this.counter === 0) {
                this.playSound('neverwin')
                // this.soundsList.neverwin.play()

                currentMessage = 'You lose!'
            }

            if (this.score === this.maxCards) {
                this.playSound('victory')
                // this.soundsList.victory.play()

                currentMessage = 'You win!'
                console.log('victory')
            }

            clearInterval(this.timer)
            this.isMatching = true
            this.cards.forEach((card) => {
                card.$wrapper.className = 'card hide'
            })

            const button = document.createElement('button')
            button.textContent = 'New Game'
            button.classList.add('btn')
            button.addEventListener('click', this.chooseDifficulty)

            const message = new Message(currentMessage)
            message.$wrapper.appendChild(button)
            button.addEventListener('click', () => {
                message.remove()
            })

            const cardsContainer = document.querySelector('.cards-wrapper')

            cardsContainer.appendChild(message.getHtml())
        }
    }

    /**
     *
     * @param {String} action - Define sound type to play
     */
    playSound(type, params = null) {
        if (this.soundsList.hasOwnProperty(type)) {
            const target = this.soundsList[type]
            if (params) {
                target.setParams(params)
            }
            target.play()
            return target
        }

        // const sounds = new Sounds(action)
        // sounds.play(action)

        // const random = Math.floor(Math.random() * 100)
        // const randomSound = new Sounds()

        // switch (random) {
        //     case 25:
        //         randomSound.play('outstanding')
        //         break
        //     case 75:
        //         randomSound.play('laugh')
        //         break
        //     default:
        //         break
        // }
    }

    /**
     *
     * @param {Object} card - Compare clicked cards
     * @returns
     */
    matchCard = (card) => {
        if (this.cardOne === null) {
            this.cardOne = card
            return
        }

        this.isMatching = true

        this.cardTwo = card
        const isCorrect = this.cardOne.name === this.cardTwo.name

        setTimeout(() => {
            if (isCorrect) {
                this.score++
                this.cardOne.setCorrect()
                this.cardTwo.setCorrect()
                this.playSound('good')

                this.playSound(this.cardOne.name)
                // this.soundsList.this.cardTwo.name.play()

                this.updateScore('guessed')
                return
            }

            this.strokes++
            this.cardOne.setWrong()
            this.cardTwo.setWrong()
            this.playSound('wrong')
            // this.soundsList.wrong.play()

            this.updateScore('strokes')
        }, 500)
    }

    /**
     *
     * @param {Boolean} isCorrect - True if clicked cards are identical otherwise false
     */
    updateScore(type = 'all') {
        let target

        switch (type) {
            case 'guessed':
                target = { className: '.guessed', value: this.score }
                break
            case 'strokes':
                target = { className: '.strokes', value: this.strokes }
                break

            default:
                target = { className: '.score-counter', value: 0 }
                break
        }

        this.cardOne = this.cardTwo = null
        this.isMatching = false

        const scoreWrapper = this.$wrapper.querySelectorAll(
            target.className + ' .min'
        )
        scoreWrapper.forEach((score) => {
            score.textContent = target.value
        })
        const result = { strokes: this.strokes, score: this.score }
        this.checkScore()
    }

    createLayout() {
        const html = `
                <div class="game-wrapper">
                    <div class="timer">
                        <div class="time-left">
                            <i class="fa-solid fa-clock"></i>
                            <span></span>
                        </div>
                        <div class="timebar">
                            <div class="bar"></div>
                        </div>
                    </div>
                    <div class="cards-wrapper">
                        <div class="cards">
                        </div>
                    </div>
                    <div class="score">
                        <div class="strokes">
                            <div class="label"><i class="fa-solid fa-heart-pulse"></i>Strokes</div>
                            <div class="score-counter"><span class="min">${this.strokes}</span>/${this.maxStrokes}</div>
                        </div>
                        <div class="guessed">
                            <div class="label"><i class="fa-solid fa-flag-checkered"></i>Guessed</div>
                            <div class="score-counter"><span class="min">${this.score}</span>/${this.maxCards}</div>
                        </div>
                    </div>
                </div>
                `

        return utilities.createFragment(html)
    }

    async getHtml() {
        this.insertContent(this.$wrapper)

        return this.layout
    }
}
