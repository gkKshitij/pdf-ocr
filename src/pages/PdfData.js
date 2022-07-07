import { useContext } from "react";
import DataContext from "../store/pdf-data";
import Document from "./Document";

function PdfData() {
    const dataCtx = useContext(DataContext);
    const pdftext = dataCtx.textData;
    const keyValueData = dataCtx.keyValueData;
    const pdfImgData = dataCtx.pdfImgData;
    const imgLineData = dataCtx.imgLineData;
    let newKeyValueData = [];

    const keyValueRow = [
        {
            key: 'Tax Reg. No',
            row: 2,
            style:{
                mobile:{
                    left:'140',
                    top:'44'
                },
                laptopS:{
                    left:'180',
                    top:'49'
                },
                laptopL:{
                    left:'285',
                    top:'50'
                },
                desktopS:{
                    left:'340',
                    top:'76'
                },
                desktopL:{
                    left:'385',
                    top:'76'
                }
            }
        },
        {
            key: 'Telephone',
            row: 3,
            style:{
                mobile:{
                    left:'140',
                    top:'53'
                },
                laptopS:{
                    left:'180',
                    top:'58'
                },
                laptopL:{
                    left:'285',
                    top:'58'
                },
                desktopS:{
                    left:'340',
                    top:'90'
                },
                desktopL:{
                    left:'385',
                    top:'90'
                }
            }
        },
        {
            key: 'Fax',
            row: 4,
            style:{
                mobile:{
                    left:'140',
                    top:'61'
                },
                laptopS:{
                    left:'180',
                    top:'68'
                },
                laptopL:{
                    left:'285',
                    top:'68'
                },
                desktopS:{
                    left:'340',
                    top:'103'
                },
                desktopL:{
                    left:'385',
                    top:'103'
                }
            }
        },
        {
            key: 'External Order No',
            row: 6,
            style:{
                mobile:{
                    left:'140',
                    top:'77'
                },
                laptopS:{
                    left:'180',
                    top:'85'
                },
                laptopL:{
                    left:'285',
                    top:'85'
                },
                desktopS:{
                    left:'340',
                    top:'130'
                },
                desktopL:{
                    left:'385',
                    top:'130'
                }
            }
        },
        {
            key: 'Vat No',
            row: 7,
            style:{
                mobile:{
                    left:'140',
                    top:'85'
                },
                laptopS:{
                    left:'180',
                    top:'95'
                },
                laptopL:{
                    left:'285',
                    top:'95'
                },
                desktopS:{
                    left:'340',
                    top:'144'
                },
                desktopL:{
                    left:'385',
                    top:'144'
                }
            }
        },
        {
            key: 'Subtotal',
            row: 11,
            style:{
                mobile:{
                    left:'172',
                    top:'183'
                },
                laptopS:{
                    left:'217',
                    top:'203'
                },
                laptopL:{
                    left:'344',
                    top:'203'
                },
                desktopS:{
                    left:'400',
                    top:'306'
                },
                desktopL:{
                    left:'450',
                    top:'306'
                }
            }
        },
        {
            key: 'Tax',
            row: 12,
            style:{
                mobile:{
                    left:'172',
                    top:'196'
                },
                laptopS:{
                    left:'217',
                    top:'217'
                },
                laptopL:{
                    left:'344',
                    top:'217'
                },
                desktopS:{
                    left:'400',
                    top:'327'
                },
                desktopL:{
                    left:'450',
                    top:'327'
                }
            }
        },
        {
            key: 'Discount',
            row: 14,
            style:{
                mobile:{
                    left:'172',
                    top:'220'
                },
                laptopS:{
                    left:'217',
                    top:'242'
                },
                laptopL:{
                    left:'344',
                    top:'242'
                },
                desktopS:{
                    left:'400',
                    top:'365'
                },
                desktopL:{
                    left:'450',
                    top:'365'
                }
            }
        },
        {
            key: 'Total',
            row: 17,
            style:{
                mobile:{
                    left:'172',
                    top:'239'
                },
                laptopS:{
                    left:'217',
                    top:'265'
                },
                laptopL:{
                    left:'344',
                    top:'265'
                },
                desktopS:{
                    left:'400',
                    top:'400'
                },
                desktopL:{
                    left:'450',
                    top:'400'
                }
            }
        }
    ];

    // const keyValueRow = [
    //     {key: 'Tax Reg. No',row: 2}
    // ];

    for (const key in keyValueRow) {
        const row = keyValueRow[key]['row'];
        const dataKey = keyValueRow[key]['key'];
        const objForTaxRegNo = imgLineData[row] && imgLineData[row] ? imgLineData[row] : null;
        if(objForTaxRegNo){
            const textForTaxRegNo = objForTaxRegNo['text'] ? objForTaxRegNo['text'] : '';
            if(textForTaxRegNo != ''){
                var value = '';
                let x0 = 0;
                let y0 = 0;
                const lastOccurrenceOfSpace = textForTaxRegNo.lastIndexOf(' ');
                value = textForTaxRegNo.substring(lastOccurrenceOfSpace+1).trim();
                const objIndex = newKeyValueData.findIndex((obj => obj.key == dataKey));
                if(objIndex != -1){
                    newKeyValueData[objIndex].value = value;
                }else{
                    const wordsOfLine = objForTaxRegNo['words'] ? objForTaxRegNo['words'] : null;
                    if(wordsOfLine){
                        const indexOfValue = wordsOfLine.findIndex(obj => obj['text'].trim() == value);
                        if(indexOfValue != -1){
                            const wordData = wordsOfLine[indexOfValue] ? wordsOfLine[indexOfValue] : null;
                            if(wordData){
                                x0 = wordData['bbox'] && wordData['bbox']['x0'] ? wordData['bbox']['x0'] : 0;
                                y0 = wordData['bbox'] && wordData['bbox']['y0'] ? wordData['bbox']['y0'] : 0;
                            }
                        }
                    }
                    newKeyValueData.push({
                        key: dataKey, 
                        value: value, 
                        class: dataKey.replace(/\s+/g, '-').toLowerCase(),
                        x0: x0,
                        y0: y0,
                        style: {
                            mobile:{left: keyValueRow[key]['style']['mobile']['left'],top: keyValueRow[key]['style']['mobile']['top']},
                            laptopS:{left: keyValueRow[key]['style']['laptopS']['left'],top: keyValueRow[key]['style']['laptopS']['top']},
                            laptopL:{left: keyValueRow[key]['style']['laptopL']['left'],top: keyValueRow[key]['style']['laptopL']['top']},
                            desktopS:{left: keyValueRow[key]['style']['desktopS']['left'],top: keyValueRow[key]['style']['desktopS']['top']},
                            desktopL:{left: keyValueRow[key]['style']['desktopL']['left'],top: keyValueRow[key]['style']['desktopL']['top']}
                        }
                    });
                }
            }
        }
    }
    console.log(newKeyValueData);
    return(
        <Document 
            pdfImgData={pdfImgData}
            existingKeyValueData={newKeyValueData}
        />
    )
}

export default PdfData;