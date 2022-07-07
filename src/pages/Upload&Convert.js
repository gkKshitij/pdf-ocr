import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

import { useContext } from "react";
import DataContext from "../store/pdf-data";

import { createWorker } from "tesseract.js";

const PDFJS = window.pdfjsLib;

function UploadAndConvert(){
    const history = useHistory();   
    const dataCtx = useContext(DataContext);

    const [pdf, setPdf] = React.useState("");
    const [width, setWidth] = React.useState(0);
    const [scale, setScale] = React.useState(0);
    const [image, setImage] = React.useState("");
    const [height, setHeight] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pdfRendering, setPdfRendering] = React.useState("");
    const [pageRendering, setPageRendering] = React.useState("");
    const [progress, setProgress] = React.useState(0);
    const [ocr, setOcr] = React.useState("");

    const worker = createWorker({
        logger: (m) => {
          console.log(m);
          setProgress(parseInt(m.progress * 100));
        },
    });
    
    async function showPdf(event) {
        setProgress(0);
        setOcr('');
        setImage('');
        try {
            setPdfRendering(true);
            const file = event.target.files[0];
            const uri = URL.createObjectURL(file);
            var _PDF_DOC = await PDFJS.getDocument({ url: uri });
            setPdf(_PDF_DOC);
            setPdfRendering(false);
            document.getElementById("file-to-upload").value = "";
        } catch (error) {
            alert(error.message);
        }
    }
    
    function changePage() {
        setCurrentPage();
    }

    async function renderPage() {
        setPageRendering(true);
        console.log("renderpage");
        var page = await pdf.getPage(currentPage);
        console.log("renderpage 2");
        var viewport = page.getViewport(currentPage);
        console.log("renderpage 3");
        var render_context = {
            canvasContext: document.querySelector("#pdf-canvas").getContext("2d"),
            viewport: viewport
        };
        console.log("viewport", viewport, viewport.scale);
        // setWidth(viewport.width);
        setWidth(600);
        // setHeight(viewport.height);
        setHeight(450);
        setScale(viewport.scale);
        await page.render(render_context);

        var canvas = document.getElementById("pdf-canvas");
        var img = canvas.toDataURL("image/png");
        setImage(img);
        // console.log('img=>'+img);
        setPageRendering(false);
        convertImageToText(img);
    }
    
    useEffect(() => {
        pdf && renderPage();
        // eslint-disable-next-line
    }, [pdf, currentPage]);
    
    const convertImageToText = async (imageData) => {
        console.log('in convertImageToText');
        console.log(imageData);
        if (!imageData) return;
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const response = await worker.recognize(imageData);
        console.log('response');
        console.log(response);
        setOcr(response.data.text);
        dataCtx.addImgData(imageData);
        dataCtx.addText(response.data.text);
        dataCtx.addImgLineData(response.data.lines);
        history.push('/document');
    };

    return (
        <div className="App">
            <button
                id="upload-button"
                onClick={() => document.getElementById("file-to-upload").click()}
            >
            Select PDF
            </button>
            <input
                type="file"
                id="file-to-upload"
                accept="application/pdf"
                hidden
                onChange={showPdf}
            />
            {/* progress < 100 &&  */}
            {progress < 100 && progress > 0 && <div>
                <div className="progress-label">Progress ({progress}%)</div>
                <div className="progress-bar">
                    <div className="progress" style={{width: `${progress}%`}} ></div>
                </div>
            </div>}
    
            <div>
                <div style={{ width: '100%' }}>
                <p>{ocr}</p>
                </div>
                {/* <div style={{ width: '60%', float: 'right' }}>
                {image && (
                    <img src={image} style={{ width: 450, height: 450, border: '1px solid' }} alt="pdfImage" />
                )}
                </div> */}
            </div>
    
            <div id="pdf-main-container" style={{float: 'left', display: 'none'}}>
                <div id="pdf-loader" hidden={!pdfRendering}>
                Loading document ...
                </div>
                <div id="pdf-contents">
                {/* <div id="pdf-meta">
                    <div id="pdf-buttons">
                    <button id="pdf-prev" onClick={() => changePage(currentPage - 1)}>
                        Previous
                    </button>
                    <button id="pdf-next" onClick={() => changePage(currentPage + 1)}>
                        Next
                    </button>
                    </div>
                    <div id="page-count-container">
                    Page {currentPage} of <div id="pdf-total-pages">{totalPages}</div>
                    </div>
                </div> */}
                <canvas id="pdf-canvas" width={width} height={height}></canvas>
                <div id="page-loader" hidden={!pageRendering}>
                    Loading page ...
                </div>
                {/* <button>Show PNG</button>
                <button>Download PNG</button> */}
                </div>
            </div>
    
            {/* {image && (
                <img 
                src={image} 
                style={{ 
                    width: 450, 
                    height: 450, 
                    border: '1px solid', 
                    float: 'right', 
                    marginRight: '75px' 
                }} 
                alt="pdfImage" 
                />
            )} */}
        </div>
    );
}

export default UploadAndConvert;