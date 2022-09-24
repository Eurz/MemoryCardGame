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
        'raiden',
        'shinnok',
    ]

    let data = utilities.shuffleArray(cards).splice(0, nbCards)
    data = data.concat([...data])

    return utilities.shuffleArray(data)
}

export function getSoundsList() {
    const list = {
        victory: 'applause.wav',
        tictacclock: 'tic-tac-clock.wav',
        destiny: 'chooseyourdestiny.mp3',
        excellent: 'excellent.mp3',
        finishim: 'finishim.mp3',
        iwin: 'iwin.mp3',
        makemelaugh: 'makemelaugh.mp3',
        neverwin: 'neverwin.mp3',
        click: 'click2.mp3',
        good: 'good-card.wav',
        wrong: 'wrong.mp3',
        music: 'music.mp3',
        laugh: 'laugh.mp3',
        flawless: 'flawless-victory.mp3',
        outstanding: 'outstanding.mp3',
        liukang: 'liukang.mp3',
        kitana: 'kitana.mp3',
        mileena: 'mileena.mp3',
        reptile: 'reptile.mp3',
        scorpion: 'scorpion.mp3',
        sindel: 'sindel.mp3',
        subzero: 'subzero.mp3',
    }
    return list
}
