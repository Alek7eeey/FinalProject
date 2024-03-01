import types from "../../enumTypes";


export interface IEntryInfo{
    nameEntry: string,
    typeEntry: types,
    descriptionEntry: string,
    parentName: string,
    idEntry: number,
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>)=>void,
}