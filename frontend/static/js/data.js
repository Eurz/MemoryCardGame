import utilities from './functions/utilities.js'

export async function getCards(nbCards = 8) {
    const cards = [
        'noob',
        'liukang',
        'kitana',
        'mileena',
        'reptile',
        'scorpion',
        'shangtsung',
        'subzero',
        'sindel',
        'fujin',
        'rain',
        'quan-chi',
    ]

    let data = utilities.shuffleArray(cards).splice(0, nbCards)
    data = data.concat([...data])

    return utilities.shuffleArray(data)
}

export function getSoundsList() {
    const list = {
        victory: './static/js/libs/sounds/applause.wav',
        tictacclock: './static/js/libs/sounds/tic-tac-clock.wav',
        destiny: './static/js/libs/sounds/chooseyourdestiny.mp3',
        excellent: './static/js/libs/sounds/excellent.mp3',
        finishim: './static/js/libs/sounds/finishim.mp3',
        iwin: './static/js/libs/sounds/iwin.mp3',
        makemelaugh: './static/js/libs/sounds/makemelaugh.mp3',
        neverwin: './static/js/libs/sounds/neverwin.mp3',
        click: './static/js/libs/sounds/click2.mp3',
        good: './static/js/libs/sounds/good-card.wav',
        wrong: './static/js/libs/sounds/wrong.mp3',
        music: './static/js/libs/sounds/music.mp3',
        laugh: './static/js/libs/sounds/laugh.mp3',
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
    return list
}
