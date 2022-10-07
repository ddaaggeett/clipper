const { useState } = require('react')
const { useDispatch } = require('react-redux')
const actions = require('../redux/actions/actionCreators')
const aruco0 = require('../../../../assets/aruco_0.svg')
const aruco1 = require('../../../../assets/aruco_1.svg')
const aruco2 = require('../../../../assets/aruco_2.svg')
const aruco3 = require('../../../../assets/aruco_3.svg')
const { borderWidth } = require('../constants')

export default () => {

    const redux = useDispatch()

    const handleArucoClick = () => redux(actions.updateAppOpened(false))

    const [cursor, setCursor] = useState('default')
    const handleHover = () => setCursor('pointer')
    const handleUnhover = () => setCursor('default')

    return (
        <div>
            <img src={aruco0} style={{...arucoStyle, cursor, left:borderWidth, top:borderWidth}} onClick={handleArucoClick} onMouseOver={handleHover} onMouseOut={handleUnhover} />
            <img src={aruco1} style={{...arucoStyle, cursor, right:borderWidth, top:borderWidth}} onClick={handleArucoClick} onMouseOver={handleHover} onMouseOut={handleUnhover} />
            <img src={aruco2} style={{...arucoStyle, cursor, right:borderWidth, bottom:borderWidth}} onClick={handleArucoClick} onMouseOver={handleHover} onMouseOut={handleUnhover} />
            <img src={aruco3} style={{...arucoStyle, cursor, left:borderWidth, bottom:borderWidth}} onClick={handleArucoClick} onMouseOver={handleHover} onMouseOut={handleUnhover} />
        </div>
    )
}

const arucoStyle = {
    position: 'fixed',
    width: 100,
    height: 100,
}
