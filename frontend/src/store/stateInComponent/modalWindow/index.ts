import {types} from "mobx-state-tree";
import formStore from "../form";
import enumTypes from "../../../enumTypes";
import currentNameStore from "../currentNames";

const modalWindow = types.model("modalWindow", {
    stateNodeModal: types.boolean,
    stateSubNodeModal: types.boolean,
    stateEntryModal: types.boolean
})
    .actions(self => ({
        setStateNodeModal():void {
           self.stateNodeModal = !self.stateNodeModal;
            formStore.setCleanAllFields();
        },
        setStateSubNodeModal():void {
            self.stateSubNodeModal = !self.stateSubNodeModal;
            formStore.setCleanAllFields();
        },
        setStateEntryModal():void {
            self.stateEntryModal = !self.stateEntryModal;
            formStore.setCleanAllFields();
        },
        openSubNodeModal(parentName: string, parentType: enumTypes):void{
            currentNameStore.setCurrentParentNode(parentName);
            currentNameStore.setCurrentParentTypeNode(parentType);
            modalWindowStore.setStateSubNodeModal();
        },
        openEntryModal (parentName: string, parentType: enumTypes, childNodeName: string): void {
            currentNameStore.setCurrentChildNode(childNodeName);
            currentNameStore.setCurrentParentNode(parentName);
            currentNameStore.setCurrentParentTypeNode(parentType);
            modalWindowStore.setStateEntryModal();
        }
    }));

const defaultValue = {
    stateNodeModal: false,
    stateEntryModal: false,
    stateSubNodeModal: false
}
const modalWindowStore= modalWindow.create(defaultValue);
export default modalWindowStore;