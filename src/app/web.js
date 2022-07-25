import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
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

    const redux = useDispatch()
    const { webapp } = useSelector(state => state.xyz)

    useEffect(() => {
        const host = window.location.host
        const array = host.split('.')
        const cutIndex = host.includes('localhost') ? -1 : -2
        const subdomain = array.slice(0, cutIndex)
        const domain = array.slice(cutIndex)
        redux(actions.updateDomain(domain))
        if (subdomain.length > 0) redux(actions.updateWebApp(subdomain[0].toLowerCase()))
    }, [])

    if (webapp) {
        if (webapp == 'clipper') return <Web_Clipper />
        else if (webapp == 'whitesocket') return <Web_Whitesocket />
        else return null
    }
    else return null
}
