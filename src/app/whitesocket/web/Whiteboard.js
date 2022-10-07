import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageBackground, View, Image, StyleSheet } from 'react-native'
import * as actions from '../redux/actions/actionCreators'
const { serverIP, expressPort } = require('../../../../config')
const { borderWidth, defaultImage } = require('../constants')

export default (props) => {

    const redux = useDispatch()
    const { current, prepping, outputShape } = useSelector(state => state.whitesocket)
    const [height, setHeight] = useState(window.innerHeight - (2*borderWidth))
    const [width, setWidth] = useState(window.innerWidth - (2*borderWidth))
    const imageBaseURI = `http://${serverIP}:${expressPort}/`
    const [imageURI, setImageURI] = useState(`${imageBaseURI}${current.result_uri}`)

    useEffect(() => {
        if(prepping) setImageURI(`${imageBaseURI}${defaultImage}`)
    }, [prepping])

    useEffect(() => {
        setImageURI(`${imageBaseURI}${current.result_uri}`)
    }, [current])

    const scaleImage = () => {
        if(current.shape != undefined){
            if(outputShape.width/outputShape.height <= current.shape.width/current.shape.height) {
                setWidth(window.innerWidth - (2*borderWidth))
                setHeight((window.innerWidth - (2*borderWidth))/current.shape.width*current.shape.height)
            }
            else {
                setHeight(window.innerHeight - (2*borderWidth))
                setWidth((window.innerHeight - (2*borderWidth))/current.shape.height*current.shape.width)
            }
        }
    }

    const handleResize = () => {
        redux(actions.updateOutputShape({
            width: window.innerWidth - (2*borderWidth),
            height: window.innerHeight - (2*borderWidth),
        }))
        scaleImage()
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <ImageBackground
            source={{uri: `${imageBaseURI}${defaultImage}`}}
            style={{width: outputShape.width, height: outputShape.height}}
            >
            <Image
                source={{ uri: imageURI }}
                style={{width, height}}
                />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
