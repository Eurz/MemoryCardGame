import { getSoundsList } from '../data.js'

export default class Sounds {
    constructor(url) {
        this.url = url
        this.params = { loop: false, volume: 1 }
        this.loop = false
        this.volume = 1
        this.soundGame = new Audio()
    }

    getUrl() {
        const url = `./static/js/libs/sounds/${this.url}`
        return url
    }

    async setParams(params) {
        const newParams = Object.assign(this.params, params)
        this.params = newParams
        this.loop = newParams.loop
        this.volume = newParams.volume
    }

    async play() {
        await this.setParams()
        // console.log(this.params)
        // console.log(this.url, this.loop)
        this.soundGame.src = this.getUrl()
        this.soundGame.loop = this.loop
        this.soundGame.volume = this.volume

        // if (this.#soundsList.hasOwnProperty(soundsType)) {
        //     throw new Error("That sound doesn't exist")
        // }

        // let test = soundsType

        this.soundGame.addEventListener('loadeddata', () => {
            if (this.soundGame.readyState >= 2) {
                this.soundGame.play()

                return
            }

            throw new Error('Fichier audio non récupérabble')
        })

        // switch (soundsType) {
        //     case 'music':
        //         this.soundGame.loop = true
        //         this.soundGame.volume = 0.3
        //         break

        //     case 'tictacclock':
        //         this.soundGame.loop = true
        //         this.soundGame.volume = 0.3
        //         break

        //     default:
        //         break
        // }

        // this.soundGame.play()

        // this.soundGame.src = this.#soundsList[test]
    }

    pause() {
        this.soundGame.pause()
    }
}
