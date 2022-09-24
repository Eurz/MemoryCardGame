import { getSoundsList } from '../data.js'

export default class Sounds {
    #soundsList
    constructor(soundAction) {
        this.#soundsList = getSoundsList()
        this.soundAction = soundAction
        this.soundGame = new Audio()
    }

    play(soundsType, looping) {
        // if (this.#soundsList.hasOwnProperty(soundsType)) {
        //     throw new Error("That sound doesn't exist")
        // }

        // let test = soundsType
        if (!this.#soundsList.hasOwnProperty(soundsType)) {
            soundsType = 'laugh'
        }
        this.soundGame.src = this.#soundsList[soundsType]

        this.soundGame.addEventListener('loadeddata', () => {
            if (this.soundGame.readyState >= 2) {
                this.soundGame.play()

                return
            }

            throw new Error('Fichier audio non récupérabble')
        })
        switch (soundsType) {
            case 'music':
                this.soundGame.loop = true
                this.soundGame.volume = 0.3
                break

            case 'tictacclock':
                this.soundGame.loop = true
                this.soundGame.volume = 0.3
                break

            default:
                break
        }

        // this.soundGame.play()

        // this.soundGame.src = this.#soundsList[test]
    }
    pause() {
        this.soundGame.pause()
    }
}
