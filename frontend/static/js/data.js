import utilities from './functions/utilities.js'

export function getCards(nbCards = 8) {
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
    data = data.concat(utilities.shuffleArray([...data]))

    return data
}
