import { Fragment, useRef, useState } from "react";
import KeyValue from "./KeyValue";
import KeyValueBox from "./KeyValueBox";
import LeaderLine from "leader-line-new";
import classes from "./Document.module.css";

// const existingKeyValueData = [
//     {'key':'Tax Reg. No','value': '4650161799','class': 'tax-reg-no-div','topStyle':'13px'},
//     {'key':'Telephone','value': '0118869702','class': 'telephone-div','topStyle':'13px'},
//     {'key':'Fax', 'value': '0118869700', 'class': 'fax-div', 'topStyle':'13px'},
//     {'key':'External Order No.', 'value': '0', 'class': 'ext-order-no-div', 'topStyle':'13px'},
//     {'key':'Vat No.', 'value': '4140116098', 'class': 'vat-no-div', 'topStyle':'13px'},
//     {'key':'Total', 'value': '21324r', 'class': 'total-div', 'topStyle':'13px'},
//     {'key':'SubTotal', 'value': '567890', 'class': 'subtotal-div', 'topStyle':'13px'},
//     {'key':'Tax', 'value': '4140116098', 'class': 'tax-div', 'topStyle':'13px'},
//     {'key':'Discount', 'value': '34', 'class': 'discount-div', 'topStyle':'13px'},
//     {'key':'Acc No.', 'value': '1234567890', 'class': 'acc-no-div', 'topStyle':'13px'}
// ];

function Document(props){
    const pdfImgData = props.pdfImgData;
    const [newKeyValueData, setNewKeyValueData] = useState(props.existingKeyValueData);
    // const [newKeyValueData, setNewKeyValueData] = useState(existingKeyValueData);
    const [setActive, toggleActiveClass] = useState('');

    // const lineOptions = {
    //     color: '#2F72FF',
    //     size: 2,
    //     hide: true,
    //     startPlug: 'disc'
    // };

    // var commonLine = new LeaderLine(lineOptions);

    const handleTrClick = (activeKey) => {
        toggleActiveClass(activeKey);
        document.querySelectorAll('.leader-line').forEach(el => el.remove());
        var startId = document.getElementById(activeKey+'-tr');
        var endId = document.getElementById(activeKey+'-div');

        // commonLine.start = startId;
        // commonLine.end = endId;
        // commonLine.show();

        var line = new LeaderLine(
            startId, 
            endId, 
            {
                color: '#2F72FF',
                size: 2,
                hide: true,
                startPlug: 'disc'
            },
        );
        line.show();

        // function handleScroll(){
        //     line.position();
        // }

        // const handleScrollVar = handleScroll;
        // return handleScrollVar;
        // const handleScroll = (line) => {
        //     line.position();
        // }
        // handleScroll();
    }

    const removeHandler = (keyInput) => {
        const objIndex = newKeyValueData.findIndex((obj => obj.key == keyInput));
        let updatedItems;
        if(objIndex != -1){
            const existingItem = newKeyValueData[objIndex];
            const updatedItem = {
                ...existingItem,
                value: '' 
            }
            updatedItems = [...newKeyValueData];
            updatedItems[objIndex] = updatedItem;
            setNewKeyValueData(updatedItems);
            // toggleActiveClass('');
            // document.querySelectorAll('.leader-line').forEach(el => el.remove());
        }
    }

    const addHandler = (keyInput, newValue) => {
        const objIndex = newKeyValueData.findIndex((obj => obj.key == keyInput));
        let updatedItems;
        if(objIndex != -1){
            const existingItem = newKeyValueData[objIndex];
            const updatedItem = {
                ...existingItem,
                value: newValue
            }
            updatedItems = [...newKeyValueData];
            updatedItems[objIndex] = updatedItem;
            setNewKeyValueData(updatedItems);
            // toggleActiveClass('');
            // document.querySelectorAll('.leader-line').forEach(el => el.remove());
        }
    }

    const listItems = newKeyValueData.map(
        (input) => {
            return (
                <KeyValue
                    key={input.key}
                    inputKey={input.key}
                    value={input.value}
                    setActiveKey={setActive}
                    trClickHandler={handleTrClick}
                    id={`${input.key}-tr`}
                />
            )
        }
    );

    const divListItems = newKeyValueData.map(
        (input) => {
            return (
                <KeyValueBox 
                    key={input.key}
                    inputKey={input.key}
                    value={input.value}
                    class={input.class}
                    // topStyle={input.topStyle}
                    setActive={setActive}
                    removeClickHandler={removeHandler}
                    addClickHandler={addHandler}
                    id={`${input.key}-div`}
                    x0={input.x0}
                    y0={input.y0}
                    style={input.style}
                />
            )
        }
    );

    const scrollHandler = () => {
        console.log('scrolled');
        // const returnData = handleTrClick();
        // console.log(returnData);
    }

    return(
        <Fragment>
            <h1>Review</h1>
            {!pdfImgData && <p>Data not found.</p>}
            {pdfImgData && 
                <div className={classes.main}>
                    <div className={classes['key-value-div']}>
                        <table className={classes.table}>
                            <tbody>
                                {listItems}
                            </tbody>
                        </table>
                    </div>
                    <div className={classes['image-div']}>
                        {pdfImgData && divListItems}
                        {pdfImgData && <img 
                            src={pdfImgData} 
                            className={classes.image}
                            alt="pdfImage" 
                        />}
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Document;