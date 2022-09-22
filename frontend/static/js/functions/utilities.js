/**
 *
 * @param {HTMLElement} element - Container to create
 * @param {String} className - Class name of the container
 * @returns HTMLElement
 */
function createWrapper(element, className, id = null) {
    const wrapper = document.createElement(element)
    wrapper.classList.add(className)
    if (id) {
        wrapper.setAttribute('id', id)
    }

    return wrapper
}

function UCFirst(string) {
    const word = string[0].toUpperCase() + string.substring(1)
    return word
}

/**
 *
 * @param {String} prefix - Return an unique id with or without prefix
 * @returns
 */
function randomId(prefix = null) {
    let randomNumber = ''
    if (prefix) {
        randomNumber += prefix
    }
    return randomNumber + Math.floor(Math.random() * 100000)
}

function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5)
    return inputArray
}

function createFragment(html) {
    const range = document.createRange()

    range.selectNode(document.body)

    return range.createContextualFragment(html).children[0]
}

const utilities = {
    createWrapper,
    UCFirst,
    randomId,
    shuffleArray,
    createFragment,
}

export default utilities
