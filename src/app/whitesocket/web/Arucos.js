const { useDispatch } = require('react-redux')
const actions = require('../redux/actions/actionCreators')
const aruco0 = require('../../../../assets/aruco_0.svg')
const aruco1 = require('../../../../assets/aruco_1.svg')
const aruco2 = require('../../../../assets/aruco_2.svg')
const aruco3 = require('../../../../assets/aruco_3.svg')
const { borderWidth } = require('../../../../config')

export default () => {

    const redux = useDispatch()

    const handleArucoClick = () => redux(actions.updateAppOpened(false))

    return (
        <div>
            <img src={aruco0} style={{...arucoStyle, left:borderWidth,top:borderWidth}} onClick={handleArucoClick} />
            <img src={aruco1} style={{...arucoStyle, right:borderWidth,top:borderWidth}} onClick={handleArucoClick} />
            <img src={aruco2} style={{...arucoStyle, right:borderWidth,bottom:borderWidth}} onClick={handleArucoClick} />
            <img src={aruco3} style={{...arucoStyle, left:borderWidth,bottom:borderWidth}} onClick={handleArucoClick} />
        </div>
    )
}

const arucoStyle = {
    position: 'fixed',
    width: 100,
    height: 100,
}
