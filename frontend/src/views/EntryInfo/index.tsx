import {Button} from "@material-ui/core";
import modalWindowStore from "../../store/stateInComponent/modalWindow";
import useStyle from "./style";
import React, {FC} from "react";
import {IEntryInfo} from "./interface";
import ButtonCloseForm from "../Form/AdditionalComponent/ButtonCloseForm";
import {observer} from "mobx-react";
import entryFileStore from "../../store/main/entryFile";
import {Page, Document} from "react-pdf";
import {fileType} from "../../enumTypes";
import { pdfjs } from 'react-pdf';
import formStore from "../../store/stateInComponent/form";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const EntryInfo: FC<IEntryInfo> = observer(({nameEntry, descriptionEntry, typeEntry, parentName,idEntry, handleFileChange}) => {
    const classes = useStyle();
    const currentType: string | undefined = "." + typeEntry.slice(-4).toLowerCase().replace(/\s/g, '');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect((): void => {
        setIsLoading(true);
        try {
            entryFileStore.downloadFileFromServer(idEntry).finally(
                () => setIsLoading(false)
            );
        }
        catch (error){
            alert(error);
        }
    }, []);

    return (
    <>
           <h2 className={classes.headerText}>{nameEntry}</h2>
            <div className={classes.mainContainer}>
                <div className={classes.leftContainer}>
                    <p><b>Тип:</b> {typeEntry}</p>
                    <p><b>Описание:</b> {descriptionEntry}</p>
                    <p><b>Название узла-родителя:</b> {parentName}</p>

                    <input
                        accept={currentType}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        disabled={isLoading || entryFileStore.isDownload}
                        onChange={handleFileChange}
                    />
                    <label className={classes.btn} htmlFor="raised-button-file">
                        <Button disabled={isLoading || entryFileStore.isDownload} color="primary" variant={"contained"} component="span">
                            Прикрепить {currentType}-файл (до 5 мб)
                        </Button>
                    </label>

                    <ButtonCloseForm onClickAction={modalWindowStore.setStateEntryInfoModal}/>
                    {(formStore.errorFileType || formStore.errorFileTooBig) &&
                        <p className={classes.errorMessage}>{formStore.errorDescription}</p>
                    }
                </div>
                <div className={classes.rightContainer}>
                    <div>
                        <h2 className={classes.headerText2}>Информация:</h2>
                    </div>

                    <div className={classes.innerRightContainer}>
                        {isLoading ? (
                            <p>Загрузка файла...</p>
                        ) : !entryFileStore.isDownload ? (
                            <h3>--- Файл ещё не добавлен ---</h3>
                        ) : (
                            <>
                                {(() => {
                                    switch (currentType) {
                                        case fileType.txt:
                                            return <p>{entryFileStore.getTxtFormatContent()}</p>;
                                        case fileType.json:
                                            return <p>{JSON.stringify(entryFileStore.getJsonFormatContent())}</p>;
                                        case fileType.svg:
                                            return <img src={entryFileStore.getSvgFormatContent()} style={{maxWidth: '100%', maxHeight: '50vh'}} alt="SVG content"/>;
                                        case fileType.pdf:
                                            return (
                                                <Document file={entryFileStore.getPdfFormatContent()}>
                                                    {Array.from(new Array(entryFileStore.countPagePdf), (el, index:number) => (
                                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false}/>
                                                    ))}
                                                </Document>
                                            );
                                        default:
                                            return null;
                                    }
                                })()}
                            </>
                        )}
                    </div>

                </div>
            </div>
    </>
    )
})

export default EntryInfo;