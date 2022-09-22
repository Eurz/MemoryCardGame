// import Tasks from '../controllers/Tasks.js'
import Home from '../viewmodels/Home.js'
import Game from '../viewmodels/Game.js'

const routes = [
    { path: '/', view: Home },
    { path: '/game', view: Game },
    // { path: '/profile/:id', view: Profile },
    // { path: '/settings', view: Settings },
]

export default routes
