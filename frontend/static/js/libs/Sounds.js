export default class Sounds {
    #soundsList
    constructor(soundAction) {
        this.#soundsList = {
            victory: './static/js/libs/sounds/applause.wav',
            click: './static/js/libs/sounds/click.mp3',
            good: './static/js/libs/sounds/good-card.wav',
            wrong: './static/js/libs/sounds/bong.wav',
            music: './static/js/libs/sounds/music.mp3',
            laugh: './static/js/libs/sounds/rires.mp3',
            flawless: './static/js/libs/sounds/flawless-victory.mp3',
            outstanding: './static/js/libs/sounds/outstanding.mp3',
            liukang: './static/js/libs/sounds/liukang.mp3',
            kitana: './static/js/libs/sounds/kitana.mp3',
            mileena: './static/js/libs/sounds/mileena.mp3',
            reptile: './static/js/libs/sounds/reptile.mp3',
            scorpion: './static/js/libs/sounds/scorpion.mp3',
            sindel: './static/js/libs/sounds/sindel.mp3',
            subzero: './static/js/libs/sounds/subzero.mp3',
        }
        this._soundAction = soundAction
        this.soundGame = new Audio()
        // this.play(this._soundAction)
    }

    play(soundsType) {
        // if (this.#soundsList.hasOwnProperty(soundsType)) {
        //     throw new Error("That sound doesn't exist")
        // }

        // let test = soundsType
        if (!this.#soundsList.hasOwnProperty(soundsType)) {
            soundsType = 'laugh'
        }

        // this.soundGame.play()

        // this.soundGame.src = this.#soundsList[test]
        this.soundGame.src = this.#soundsList[soundsType]
        this.soundGame.play()
    }
}
