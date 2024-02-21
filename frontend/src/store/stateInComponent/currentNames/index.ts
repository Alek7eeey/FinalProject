import {types} from "mobx-state-tree";
import EnumTypes from "../../../enumTypes";


const currentNames = types.model("currentNames", {
    currentParentNode: types.string,
    currentParentTypeNode: types.string,
    currentChildNode: types.string
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
        }
    }));

const defaultValue = {
    currentParentNode: '',
    currentChildNode: '',
    currentParentTypeNode: ''
}
const currentNameStore= currentNames.create(defaultValue);
export default currentNameStore;