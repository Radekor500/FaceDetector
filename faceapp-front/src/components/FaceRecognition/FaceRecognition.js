import React from 'react';
import './FaceRecognition.css'

class FaceRecognition extends React.Component {    
    render() {
        const {box,Url} = this.props;
        return (
        <div className='container'> <br></br>
            <div id='imgborder' style={{height: box.bottom_row-box.top_row, width:box.right_col-box.left_col, marginTop: box.top_row, marginBottom: box.bottom_row, marginLeft: box.left_col, marginRight: box.right_col}}></div>
            <img id='inputimage'  alt="" src={Url} width='500px' height='auto'/>
        </div>
        )
        }
    
    
}

export default FaceRecognition;