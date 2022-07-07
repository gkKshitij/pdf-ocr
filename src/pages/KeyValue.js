import classes from "./KeyValue.module.css";

function KeyValue(props){
    const handleClick = () => {
        props.trClickHandler(props.inputKey);
    }

    return(
        <tr className={`${props.setActiveKey == props.inputKey ? classes['active-tr'] : ''}`} 
            onClick={handleClick}
            id={props.id}
        >
            <td>{props.inputKey}</td>
            <td>{props.value}</td>
        </tr>
    )
}

export default KeyValue;