import { getCards } from '../data.js'
import utilities from '../functions/utilities.js'
import Sounds from '../libs/Sounds.js'
import CardGame from '../views/CardGame.js'
import Message from '../views/Message.js'
import AbstractView from './AbstractView.js'

export default class Game extends AbstractView {
    constructor() {
        super()
        this.cardsName = getCards()
        this.maxStrokes = 10
        this.maxCards = this.cardsName.length / 2
        this.strokes = 0
        this.score = 0
        this.$wrapper = this.createLayout()
        this.$cardsWrapper = this.$wrapper.querySelector('.cards')
        this.cardOne = this.cardTwo = null
        this.isMatching = false

        this.createGame()
    }

    /**
     * Init a new game
     */
    createGame = () => {
        this.score = 0
        this.strokes = 0
        this.isMatching = false
        this.updateScore()

        this.$timeBar = this.$wrapper.querySelector('.bar')
        this.$timeBar.classList.add('start')
        this.$timeBar.style.animationDuration = `${this.defaultTime}s`

        this.$cardsWrapper.innerHTML = ''

        this.cards = this.cardsName.map((name, index) => {
            const card = new CardGame(name)
            const template = card.getHtml()
            template.dataset.id = index

            card.$wrapper.addEventListener('click', () => {
                this.onHandleClick(card)
            })

            setTimeout(() => {
                template.classList.add('show')
            }, 200 * index)

            this.$cardsWrapper.appendChild(card.$wrapper)

            return card
        })
    }

    /**
     *
     * @param {Object} card - Event when a card is clicked
     */
    onHandleClick = (card) => {
        if (!this.isMatching) {
            this.matchCard(card)
            card.flipCard()
            this.playSound('click')
        }
    }

    /**
     * Check if maxStrokes or maxCards are reached
     */
    checkScore() {
        let currentMessage

        if (this.strokes >= this.maxStrokes || this.score === this.maxCards) {
            if (this.strokes >= this.maxStrokes) {
                this.isMatching = true
                this.cards.forEach((card) => {
                    card.$wrapper.className = 'card hide'
                })
                currentMessage = 'You lose!'
            }

            if (this.score === this.maxCards) {
                this.isMatching = true
                this.cards.forEach((card) => {
                    card.$wrapper.className = 'card hide'
                })
                currentMessage = 'You win!'
            }

            const button = document.createElement('button')
            button.textContent = 'New Game'
            button.classList.add('btn')
            button.addEventListener('click', this.createGame)

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
    playSound(action) {
        const sounds = new Sounds()
        sounds.play(action)

        const random = Math.floor(Math.random() * 100)
        const randomSound = new Sounds()

        switch (random) {
            case 25:
                randomSound.play('outstanding')
                break
            case 75:
                randomSound.play('laugh')
                break
            default:
                break
        }
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
                this.updateScore('guessed')
                return
            }

            this.strokes++
            this.cardOne.setWrong()
            this.cardTwo.setWrong()
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

        this.checkScore()
    }

    createLayout() {
        const html = `
                <div class="game-wrapper">
                    <div class="timer">
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
