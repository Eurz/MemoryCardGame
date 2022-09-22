import utilities from '../functions/utilities.js'

export default class Message {
    constructor(text) {
        this.text = text
        this.$wrapper = this.createLayout()
    }

    createLayout() {
        const html = `
        <div class="message">
            <div class="title">${this.text}</div>
           
        </div>
        `
        return utilities.createFragment(html)
    }

    getHtml() {
        return this.$wrapper
    }
}
