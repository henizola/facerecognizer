import React from 'react';
import './Input.css'



const Input=({onInputChange,onButtonSubmit})=>
{
    return(
            <div>
                <p className='f3'>
                    {'this smart brain will recogonize a face in your image give it a try'}
                </p>
                <div className='center '>
                     <div className='input center pa4 pr3 shadow-4 '>
                        <input className='f3 pa2 w-70 center' type='text' onChange={onInputChange }></input>
                         <button className='f2 pa2 w-30 center grow link ph3 pv2 dib white 
                         bg-light-purple'onClick={onButtonSubmit} >Detect</button>
                         
                </div>   
                </div>
            

            </div>
    ); 
}
export default Input;