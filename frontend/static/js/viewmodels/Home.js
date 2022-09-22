import LayoutHome from '../views/layouts/LayoutHome.js'

export default class Home {
    constructor() {}

    async getHtml() {
        const layout = new LayoutHome()
        return layout.createLayout()
    }
}
