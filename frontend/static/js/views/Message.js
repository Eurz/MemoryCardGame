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

    remove() {
        const doc = document.body.querySelector('.message')
        doc.remove()
    }
    getHtml() {
        return this.$wrapper
    }
}
