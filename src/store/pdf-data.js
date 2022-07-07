import React, { useState } from "react";

const DataContext = React.createContext({
    text: null,
    keyValues: [],
    imgData: null,
    imgLineData: {},
    addText: (text) => {},
    addImgData: (imgContent) => {},
    addImgLineData: (input) => {}
});

export const DataContextProvider = (props) => {
    const [pdfText, setPdfText] = useState('');
    const [keyValuePair, setKeyValuePair] = useState([]);
    const [imgTextData, setImgTextData] = useState('');
    const [imgLineData, setImgLineData] = useState({});

    const addTextHandler = (documentText) => {
        setPdfText(documentText);
    }

    const addImgDataHandler = (inputText) => {
        setImgTextData(inputText);
    }

    const addImgLineDataHandler = (input) => {
        setImgLineData(input);
    }

    const contextValue = {
        textData: pdfText,
        keyValueData: keyValuePair,
        pdfImgData: imgTextData,
        imgLineData: imgLineData,
        addText: addTextHandler,
        addImgData: addImgDataHandler,
        addImgLineData: addImgLineDataHandler
    }

    return (
        <DataContext.Provider value={contextValue}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContext;