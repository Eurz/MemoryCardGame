import Router from './router/Router.js'
import LayoutHome from './views/layouts/LayoutHome.js'

class App {
    constructor() {
        this.root = document.querySelector('#app')
        this.router = new Router()
    }

    render() {
        const layout = new LayoutHome()

        // const template = new this.route.view()
        // template.render()
    }
}

const app = new App()
app.render()
