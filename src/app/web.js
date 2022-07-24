import Web_Clipper from './clipper/web'
import Web_Whitesocket from './whitesocket/web'

export const webapps = [
    {
        name: 'clipper',
    },
    {
        name: 'whitesocket',
    },
    {
        name: 'podware',
    },
]

export default (props) => {

    const subdomain = props.subdomain

    if (subdomain) {
        if (subdomain == 'clipper') return <Web_Clipper />
        else if (subdomain == 'whitesocket') return <Web_Whitesocket />
        else return null
    }
    else return null
}
