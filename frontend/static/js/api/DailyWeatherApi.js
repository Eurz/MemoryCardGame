import Api from './Api'

export default class DailyWeatherApi extends Api {
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
