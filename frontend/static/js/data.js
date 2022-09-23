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
