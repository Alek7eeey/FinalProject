import {types} from "mobx-state-tree";
import formStore from "../form";
import enumTypes from "../../../enumTypes";
import currentNameStore from "../currentNames";
import entryFileStore from "../../main/entryFile";

const modalWindow = types.model("modalWindow", {
    stateNodeModal: types.boolean,
    stateSubNodeModal: types.boolean,
    stateEntryModal: types.boolean,
    stateEntryInfoModal: types.boolean,
})
    .actions(self => ({
        //открытие окна для создания узла
        setStateNodeModal():void {
           self.stateNodeModal = !self.stateNodeModal;
            formStore.setCleanAllFields();
        },
        //открытие окна для создания подузла
        setStateSubNodeModal():void {
            self.stateSubNodeModal = !self.stateSubNodeModal;
            formStore.setCleanAllFields();
        },
        //открытие окна для создания записи
        setStateEntryModal():void {
            self.stateEntryModal = !self.stateEntryModal;
            formStore.setCleanAllFields();
        },
        //открытие окна для просмотра информации про запись
        setStateEntryInfoModal():void{
            self.stateEntryInfoModal = !self.stateEntryInfoModal;
            entryFileStore.setIsDownload(false);
            entryFileStore.setCountPagePdf(0);
            formStore.setCleanAllError();
        },
        //сохранение данных при открытии окна для создания узла
        openSubNodeModal(parentName: string, parentType: enumTypes):void{
            currentNameStore.setCurrentParentNode(parentName);
            currentNameStore.setCurrentParentTypeNode(parentType);
            modalWindowStore.setStateSubNodeModal();
        },
        //сохранение данных при открытии окна для создания записи
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
    stateSubNodeModal: false,
    stateEntryInfoModal: false,
}
const modalWindowStore= modalWindow.create(defaultValue);
export default modalWindowStore;