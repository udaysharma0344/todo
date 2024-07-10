import React, { useState } from 'react'
import { X } from 'react-feather'
import './Eaditable.css'

const Eaditable = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState("")

    return (
        <div className='eaditable'>
            {showEdit ?
                <form className={`editable_edit ${props.editClass} || "" `}
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (props.onSubmit) props.onSubmit(inputValue)
                        setShowEdit(false)
                        setInputValue("")
                    }}
                >
                    <input
                        autoFocus
                        type='text'
                        placeholder={props.placeholder || "Enter item"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className='editable_edit_footer'>
                        <button type='submit'>{props.buttonText || "Add"} </button>
                        <X onClick={() => setShowEdit(false)} />
                    </div>
                </form>
                : <p className={`editable_display ${props.displayClass || ""}`} onClick={() => setShowEdit(true)}>{props.text || "Add item"}</p>}
        </div>
    )
}

export default Eaditable