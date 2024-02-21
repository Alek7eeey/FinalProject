import {types} from "mobx-state-tree";
import EnumTypes from "../../../enumTypes";


const form = types.model("form", {
    name: types.string,
    description: types.string,
    type: types.string,
    duplicateNameError: types.boolean,
    emptyFieldError: types.boolean,
    errorDescription: types.string
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
        setDuplicateNameError():void{
            self.duplicateNameError = !self.duplicateNameError;
            self.errorDescription += 'Названия не могут дублироваться!\n';
        },
        setEmptyFieldError():void{
            self.emptyFieldError = !self.emptyFieldError;
            self.errorDescription += 'Все поля должны быть заполнены!\n';
        },
        setCleanAllFields():void{
            self.emptyFieldError = false;
            self.duplicateNameError = false;
            self.name = '';
            self.type = '';
            self.description = '';
        },
        setCleanAllError():void{
            self.emptyFieldError = false;
            self.duplicateNameError = false;
            self.errorDescription = '';
        }
    }));

const defaultValue = {
    name: '',
    description: '',
    duplicateNameError: false,
    emptyFieldError: false,
    type: '',
    errorDescription: ''
}
const formStore= form.create(defaultValue);
export default formStore;