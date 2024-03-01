import {types} from "mobx-state-tree";
import EnumTypes from "../../../enumTypes";

const currentNames = types.model("currentNames", {
    currentParentNode: types.string,
    currentParentTypeNode: types.string,
    currentChildNode: types.string,
    currentEntry: types.string,
})
    .actions(self => ({
        setCurrentParentNode(newName: string):void {
           self.currentParentNode = newName;
        },
        setCurrentParentTypeNode(newType: EnumTypes):void{
            self.currentParentTypeNode = newType as string;
        },
        setCurrentChildNode(childNodeName: string):void{
            self.currentChildNode = childNodeName;
        },
        setCurrentEntry(nameEntry: string):void{
            self.currentEntry = nameEntry;
        }
    }));

const defaultValue = {
    currentParentNode: '',
    currentChildNode: '',
    currentParentTypeNode: '',
    currentEntry: '',
}
const currentNameStore= currentNames.create(defaultValue);
export default currentNameStore;