export class TasksSubject {
    constructor() {
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer)
    }

    notify(task) {
        this.observers.forEach((observer) => observer.fire(task))
    }
}

export class TaskObserver {
    constructor() {}
    fire(task) {}
}
