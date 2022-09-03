const { useEffect } = require('react')
const { useSelector, useDispatch } = require('react-redux')
const actions = require('./account/redux/actions/actionCreators')

export const initWebApp = () => {
    useDomainParser()
}

const useDomainParser = () => {
    const redux = useDispatch()
    useEffect(() => {
        const host = window.location.host
        const array = host.split('.')
        const cutIndex = host.includes('localhost') ? -1 : -2
        const subdomain = array.slice(0, cutIndex)
        const domain = array.slice(cutIndex)[0]
        redux(actions.updateDomain(domain))
        if (subdomain.length > 0) redux(actions.updateWebApp(subdomain[0].toLowerCase()))
    }, [])
}
