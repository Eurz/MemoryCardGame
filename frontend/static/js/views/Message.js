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
        this.$wrapper.classList.add('message-hide')

        setTimeout(() => {
            const doc = document.body.querySelector('.message')
            doc.remove()
        }, 1000)
    }
    getHtml() {
        return this.$wrapper
    }
}
