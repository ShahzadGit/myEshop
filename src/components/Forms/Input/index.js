import React from 'react'
import './styles.scss'

function Input({ handleChange, lable, ...otherProps}) {
    return (
        <div className="formRow">
            {lable && (<lable>{lable}</lable>)}
            <input className="formInput" onChange={handleChange} {...otherProps} />
        
         </div>
    )
}

export default Input;