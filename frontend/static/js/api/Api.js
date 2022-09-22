class Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then((res) => res.json())
            .then((res) => res)
            .catch((err) => console.log('An error occurs', err))
    }
}

export class WeatherApi extends Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }

    async getData() {
        return await this.get()
    }
}

export class CoordsFromCityNameApi extends Api {
    /**
     *
     * @param {String} url - To fetch the city name
     */
    constructor(url) {
        super(url)
    }

    async getData() {
        return await this.get()
    }
}
