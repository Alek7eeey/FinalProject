import {types} from "mobx-state-tree";
import EnumTypes from "../../../enumTypes";
import errorDescription from "../../../errorDescription";


const form = types.model("form", {
    name: types.string,
    description: types.string,
    type: types.string,
    parentName: types.string,
    duplicateNameError: types.boolean,
    emptyFieldError: types.boolean,
    errorDescription: types.string,
    errorFileType: types.boolean,
    errorFileTooBig: types.boolean,
})
    .actions(self => ({
        setName(newName: string):void {
            self.name = newName;
        },
        setType(newType: EnumTypes):void{
            self.type = newType as string;
        },
        setDescription(newDescription: string):void{
            self.description = newDescription;
        },
        setParentName(parentName: string):void{
            self.parentName = parentName;
        },
        setDuplicateNameError():void{
            self.duplicateNameError = !self.duplicateNameError;
            self.errorDescription += errorDescription.duplicateNameError;
        },
        setEmptyFieldError():void{
            self.emptyFieldError = !self.emptyFieldError;
            self.errorDescription += errorDescription.emptyFieldError;
        },
        setNameIsToLongError():void{
            self.emptyFieldError = !self.emptyFieldError;
            self.errorDescription += errorDescription.nameIsToLongError;
        },

        setInvalidFileType():void{
            self.errorFileType = !self.errorFileType;
            self.errorDescription += errorDescription.invalidFileTypeError;
        },

        setErrorFileTooBig():void{
            self.errorFileTooBig = !self.errorFileTooBig;
            self.errorDescription += errorDescription.fileTooBigError;
        },

        setCleanAllFields():void{
            Object.assign(self, defaultValue);
        },
        setCleanAllError():void{
            self.emptyFieldError = false;
            self.duplicateNameError = false;
            self.errorDescription = '';
            self.errorFileType = false;
            self.errorFileTooBig = false;
        }
    }));

const defaultValue = {
    name: '',
    description: '',
    parentName: '',
    duplicateNameError: false,
    emptyFieldError: false,
    type: '',
    errorDescription: '',
    errorFileType: false,
    errorFileTooBig: false
}
const formStore= form.create(defaultValue);
export default formStore;