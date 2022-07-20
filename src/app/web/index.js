import { useState, useEffect } from 'react'
import App_Clipper from '../clipper/web'
import App_Whitesocket from '../whitesocket/web'
import AccountScreen from '../account'

export default () => {

    const [subdomain, setSubdomain] = useState()

    useEffect(() => {
        const input = window.location.host.split(".")[0].toLowerCase()
        if (input === 'clipper') setSubdomain('clipper')
        else if (input === 'whitesocket') setSubdomain('whitesocket')
        else setSubdomain(undefined)
    }, [window.location.host])

    if (subdomain == 'clipper') return <App_Clipper />
    else if (subdomain == 'whitesocket') return <App_Whitesocket />
    else return <AccountScreen />
}
