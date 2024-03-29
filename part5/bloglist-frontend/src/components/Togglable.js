import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import "../style/style.css"

export const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
                <button
                    className='createblog-button'
                    onClick={toggleVisibility}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                {/* <button onClick={toggleVisibility}>cancel</button> */}
                <button
                    className='cancel-button'
                    onClick={toggleVisibility}>
                    cancel
                </button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

// export default Togglable