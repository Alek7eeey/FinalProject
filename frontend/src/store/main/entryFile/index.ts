import {flow, types} from "mobx-state-tree";
import {IEntryFile} from "../interface";
import {axiosGet, axiosPost} from "../../../axios";
import config from "../../../config.json";
import {serverPaths} from "../../../constants";
import * as pdfjsLib from 'pdfjs-dist';
import {fileType} from "../../../enumTypes";
import formStore from "../../stateInComponent/form";
import ErrorDescription from "../../../errorDescription";
type eventType = React.ChangeEvent<HTMLInputElement>;

const entryFile = types.model("entryFile", {
    nameFile: types.string,
    content: types.optional(types.frozen<any>(), []),
    typeFile: types.string,
    entryId: types.number,
    isDownload: types.boolean,
    countPagePdf: types.number
})
    .actions(self => ({

        //добавление файла к записи
        async setFile(event: eventType):Promise<void>{

            if (event.target.files) {
                formStore.setCleanAllError();

                const file: File = event.target.files[0];
                const fiveMbConvert:number = 5 * 1024 * 1024;
                const currentTypeEntry:string|undefined = formStore.type.slice(-4).toLowerCase().replace(/\s/g, '');

                if (file.size > fiveMbConvert) {
                    if(!formStore.errorFileTooBig) formStore.setErrorFileTooBig();
                    return;
                }

                //приведение даннных к формату base64
                const reader: FileReader = new FileReader();
                reader.readAsArrayBuffer(file);

                reader.onload = async (): Promise<void> => {
                    const content:Uint8Array = new Uint8Array(reader.result as ArrayBuffer);
                    const base64String:string = entryFileStore.getBase64StringFromUint8Array(content);
                    const currentTypeFile: string = file.name.split('.').pop() as string;

                    if(currentTypeEntry !== currentTypeFile)
                    {
                        if(!formStore.errorFileType) formStore.setInvalidFileType();
                        return;
                    }

                    formStore.setCleanAllError();
                    entryFileStore.setData(file.name, base64String, file.name.split('.').pop() as string, self.entryId);
                    await entryFileStore.sendFileToServer();
                    entryFileStore.setIsDownload(true);
                };
            }
        },

        getBase64StringFromUint8Array(content:Uint8Array):string{
            let binary:string = '';
            let bytes:Uint8Array = new Uint8Array(content);
            let len :number= bytes.byteLength;
            for (let i :number= 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            return btoa(binary);
        },

        async sendFileToServer():Promise<void>{
            const data:IEntryFile = {
                nameFile: self.nameFile,
                fileType: self.typeFile,
                content: self.content,
                entryId: self.entryId
            }
            await axiosPost<IEntryFile>(data, config.server.url + serverPaths.addEntryContent);
            await entryFileStore.setCountPagesInPdfDocument();
            },

       setData(nameFile: string, content: any, typeFile: string, entryId: number):void {
           self.nameFile = nameFile;
           self.typeFile = typeFile;
           self.content = content;
           self.entryId = entryId;
       },

        setId(id:number):void{
           self.entryId = id;
        },

        setIsDownload(state:boolean):void{
            entryFileStore.isDownload = state;
        },

        downloadFileFromServer: flow(function* (entryId: number) {
            yield axiosGet(config.server.url + serverPaths.getEntryContent+'?entryId='+entryId).then(res => {
                const entryFile = res.data;
                if(entryFile)
                {
                    const {fileName, fileType, content, entryId} = entryFile;
                    entryFileStore.setData(fileName, content, fileType, entryId);
                    entryFileStore.setCountPagesInPdfDocument();
                    entryFileStore.setIsDownload(true);
                }

            }).catch(error => {
                alert(error);
            });
        }),

        getTxtFormatContent(): string{
            const base64 = entryFileStore.content;
            const raw:string = window.atob(base64);
            const rawLength:number = raw.length;
            const array :Uint8Array= new Uint8Array(new ArrayBuffer(rawLength));

            for(let i:number = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }

            return new TextDecoder("utf-8").decode(array);
        },

        getJsonFormatContent() {
            const base64 = entryFileStore.content;
            const raw:string = window.atob(base64);
            const rawLength:number = raw.length;
            const array :Uint8Array= new Uint8Array(new ArrayBuffer(rawLength));

            for(let i:number = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }

            try {
                return JSON.parse(new TextDecoder("utf-8").decode(array));
            } catch (error) {
                return ErrorDescription.jsonError;
            }
        },

        getSvgFormatContent():string{
            const base64 = entryFileStore.content;
            const raw: string = window.atob(base64);
            const rawLength: number = raw.length;
            const array: Uint8Array= new Uint8Array(new ArrayBuffer(rawLength));

            for(let i: number = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            const svgString: string = new TextDecoder("utf-8").decode(array);

            return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
        },

        getPdfFormatContent(): string {
            const base64 = entryFileStore.content;
            const binary: string = atob(base64);
            const len: number= binary.length;
            const buffer: ArrayBuffer= new ArrayBuffer(len);
            const view: Uint8Array= new Uint8Array(buffer);
            for (let i: number = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }

            const blob: Blob = new Blob([view], { type: 'application/pdf' });
            return URL.createObjectURL(blob);
        },

        async setCountPagesInPdfDocument(): Promise<void> {

            if(self.typeFile !== fileType.pdf.replace('.', '')) return;

            try {
                const blobUrl: string = entryFileStore.getPdfFormatContent();

                if(!blobUrl) return;

                const loadingTask = pdfjsLib.getDocument(blobUrl);
                if (loadingTask) {
                    const doc = await loadingTask.promise;
                    entryFileStore.setCountPagePdf(doc.numPages);
                }
            }
            catch (error){
                alert(error);
            }
        },

        setCountPagePdf(numPages: number):void{
            self.countPagePdf = numPages;
        }
    }));

const defaultValue = {
    nameFile: '',
    content: '',
    typeFile: '',
    entryId: -1,
    isDownload: false,
    countPagePdf: 0
}
const entryFileStore= entryFile.create(defaultValue);
export default entryFileStore;