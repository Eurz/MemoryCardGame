import Sounds from '../libs/Sounds.js'

export function soundsPack(data) {
    const finalData = []

    for (const sound in data) {
        finalData.push([sound, new Sounds(data[sound])])
    }

    return Object.fromEntries(finalData)
}

// {
//     music: { play: () => this.playSound('music') },
//     victory: { play: () => this.playSound('victory') },
//     tictac: { play: () => this.playSound('tictac') },
//     click: { play: () => this.playSound('click') },
//     outstanding: { play: () => this.playSound('outstanding') },
//     end: { play: () => this.playSound('end') },
//     finishim: { play: () => this.playSound('finishim') },
// }
