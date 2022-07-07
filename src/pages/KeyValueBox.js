import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./KeyValueBox.module.css";
import styled from "styled-components";

function KeyValueBox(props){
    const textareaRef = useRef();

    const removeClickHandler = () => {
        props.removeClickHandler(props.inputKey);
    }

    const addClickHandler = () => {
        props.addClickHandler(props.inputKey, textareaRef.current.value)
    }

    const StyledDiv = styled.div`
        transform: translate(${props.x0}px, ${props.y0}px);

        @media (min-width: 320px) and (max-width: 480px){
            transform: translate(${props.style.mobile.left}px, ${props.style.mobile.top}px);
        }
        @media (min-width: 481px) and (max-width: 768px){
            transform: translate(${props.style.laptopS.left}px, ${props.style.laptopS.top}px);
        }
        @media (min-width: 769px) and (max-width: 890px){
            transform: translate(${props.style.laptopL.left}px, ${props.style.laptopL.top}px);
        }
        @media (min-width: 891px) and (max-width: 1024px){
            transform: translate(${props.style.desktopS.left}px, ${props.style.desktopS.top}px);
        }
        @media (min-width: 1025px) and (max-width: 1200px){
            transform: translate(${props.style.desktopL.left}px, ${props.style.desktopL.top}px);
        }
    `;

    return(
        // <div className={`${classes['value-div']} ${props.setActive == props.inputKey ? classes['active-div'] : ''}`}
        //     id={props.id} 
        //     style={{transform: 'translate('+props.x0+'px, '+props.y0+'px)'}}
        // >
        <StyledDiv 
            className={`${classes['value-div']} ${props.setActive == props.inputKey ? classes['active-div'] : ''}`}
            id={props.id}
        >
            <div className={classes['edit-box']}
                style={{top: '13px', display: props.setActive == props.inputKey ? 'block' : 'none' }}
            >
                <div className={classes.wrapper}>
                    <div className={classes['edit-box-wrapper']}>
                        <textarea 
                            className={classes['edit-box-input']}
                            ref={textareaRef}
                            defaultValue={props.value}
                        ></textarea>
                        <span className={classes['edit-box-label']}>{props.inputKey}</span>
                        <div className={classes['edit-box-icons']}>
                            <div className={classes.remove} onClick={removeClickHandler}>
                                <FontAwesomeIcon icon={faTimes} className={classes['wrong-icon']}/>
                            </div>
                            <div className={classes.add} onClick={addClickHandler}>
                                <FontAwesomeIcon icon={faCheck} className={classes['right-icon']}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledDiv>
        // </div>}
    )
}

export default KeyValueBox;