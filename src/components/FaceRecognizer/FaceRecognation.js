import React from 'react'
import './FaceRecognizer.css'

const FaceRecognation=({imageURL,box})=>
{
    return(
            <div className='center'>
                    <img id='inputImage' src={imageURL} alt={''} width='500px' height='auto'/>
                    <div className='bounding-box' style={{top: box.tpoRow  ,right: box.rightCol, 
                        left: box.leftClo , bottom: box.bottomRow}}></div>
            </div>
    );
}
export default FaceRecognation;