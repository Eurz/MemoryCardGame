import routes from './routes.js'

export default class Router {
    constructor() {
        const pathToRegex = (path) =>
            new RegExp(
                '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
            )

        const getParams = (match) => {
            const values = match.result.slice(1)
            const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
                (result) => result[1]
            )

            return Object.fromEntries(
                keys.map((key, i) => {
                    return [key, values[i]]
                })
            )
        }

        const navigateTo = (url) => {
            history.pushState(null, null, url)
            router()
        }

        const router = async () => {
            // Test each route for potential match
            const potentialMatches = routes.map((route) => {
                return {
                    route: route,
                    result: location.pathname.match(pathToRegex(route.path)),
                }
            })

            let match = potentialMatches.find(
                (potentialMatch) => potentialMatch.result !== null
            )

            if (!match) {
                match = {
                    route: routes[0],
                    result: [location.pathname],
                }
            }

            const view = new match.route.view(getParams(match))

            const root = document.querySelector('#app')
            root.innerHTML = ''
            root.appendChild(await view.getHtml())
        }

        window.addEventListener('popstate', router)

        document.addEventListener('DOMContentLoaded', () => {
            document.body.addEventListener('click', (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault()
                    navigateTo(e.target.href)
                }
            })

            router()
        })
    }

    // router = () => {
    //     const potentialRoutes = this.routes.find(
    //         (route) => location.pathname === route.path
    //     )
    //     if (!potentialRoutes) {
    //         potentialRoutes = this.routes[0]
    //     }

    //     console.log(potentialRoutes)
    //     const view = new potentialRoutes.getHtml()
    //     // document.querySelector('#app').innerHTML = view.getHtml()
    // }

    // navigateTo = (url) => {
    //     history.pushState(null, null, url)
    //     this.router()
    // }
}
