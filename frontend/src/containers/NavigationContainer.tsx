import Navigation from "../views/Navigation/Menu";
import React, {FC, ReactElement, useState} from "react";
import Modal from "react-modal";
import AddingNodeForm from "../views/AddingNodeForm";
import AddingEntryForm from "../views/AddingEntryForm";
import {observer} from "mobx-react-lite";
import store from "../store";
import AddingSubNodeForm from "../views/AddingSubNodeForm";
import types from "../enumTypes";

interface INavigation{
    filter: (type: types, name: string)=>void;
}
const NavigationContainer:FC<INavigation> = observer(({filter}):ReactElement => {

    const [modalNodeIsOpen, setNodeModalIsOpen] = useState<boolean>(false);
    const [modalEntryIsOpen, setModalEntryIsOpen] = useState<boolean>(false);
    const [modalSubNodeIsOpen, setModalSubNodeIsOpen] = useState<boolean>(false);

    const [currentParentNode, setCurrentParentNode] = useState<string>('');
    const [currentParentTypeNode, setCurrentParentTypeNode] = useState<types>();
    const [currentChildNode, setCurrentChildNode] = useState<string>();

    const toggleModal = (setModalState: React.Dispatch<React.SetStateAction<boolean>>) => (): void => {
        setModalState(prevState => !prevState);
    }
    const nodeModal = ():void => {
        toggleModal(setNodeModalIsOpen)();
    }

    const openSubNodeModal = (parentName: string, parentType: types):void => {
        setCurrentParentNode(parentName);
        setCurrentParentTypeNode(parentType);
        toggleModal(setModalSubNodeIsOpen)();
    }

    const closeSubNodeModal = ():void => {
        toggleModal(setModalSubNodeIsOpen)();
    }

    const openEntryModal = (parentName: string, parentType: types, childNodeName: string):void => {
        setCurrentChildNode(childNodeName);
        setCurrentParentNode(parentName);
        setCurrentParentTypeNode(parentType);

        toggleModal(setModalEntryIsOpen)();
    }

    const closeEntryModal = ():void => {
        toggleModal(setModalEntryIsOpen)();
    }

    const removeNode = async (name:string, type: string):Promise<void>=> {
        await store.data.removeNode(name, type);
        filter(type as types, name);
    }

    const removeSubNode = async (name:string, parentName: string):Promise<void>=>{
        const parentNode = store.data.data.find((node: { nodeName: string; }) => node.nodeName === parentName);

        if (parentNode) {
            await parentNode.removeSubNode(name, parentNode.nodeType, parentNode.nodeName);
            filter(parentNode.nodeType as types, name);
        } else {
            console.error(`Узел с именем ${parentName} не найден`);
        }
    }

    const addNode = async(name:string, type: types):Promise<boolean>=>{
        if(store.data.data.filter((node: { nodeName: string; })=> node.nodeName === name).length>0)
        {
            return false;
        }
        await store.data.addNode(name, type as string, true);
        toggleModal(setNodeModalIsOpen)();
        return true;
    }

    const addSubNode = async (name: string): Promise<boolean> => {
        const parentNode = store.data.data.find((node: { nodeName: string; nodeType: types | undefined; })=> node.nodeName === currentParentNode && node.nodeType === currentParentTypeNode);

        if (parentNode) {
            if(parentNode.subNodes.filter((subNode: { name: string; })=> subNode.name === name).length>0) return false;
            await parentNode.addSubNode(name, parentNode.nodeType, parentNode.nodeName, true);
            toggleModal(setModalSubNodeIsOpen)();
            return true;
        } else {
            return false;
        }
    }

    const addEntry = async(name: string, description: string):Promise<void>=>{
        const parentNode = store.data.data.find((node: { nodeName: string; nodeType: types | undefined; })=> node.nodeName === currentParentNode && node.nodeType === currentParentTypeNode);

        if(parentNode)
        {
            const childNode = parentNode?.subNodes.find((subNode: { name: string | undefined; type: types | undefined; })=>subNode.name === currentChildNode && subNode.type === currentParentTypeNode);

            if (childNode) {
                const defaultId:number = -1;
                await childNode.addEntry(defaultId, name, parentNode.nodeType, description, childNode.name, parentNode.nodeName, true);
                filter(parentNode.nodeType as types, childNode.name);
            } else {
                console.error(`Узел с именем ${currentParentNode} не найден`);
            }
        }
        toggleModal(setModalEntryIsOpen)();
    }

    return (
        <div>
            <Modal
                isOpen={modalNodeIsOpen}
                onRequestClose={nodeModal}
                contentLabel="Добавить узел"
            >
                <AddingNodeForm closeModal={nodeModal} addNode={addNode}/>
            </Modal>

            <Modal
                isOpen={modalEntryIsOpen}
                onRequestClose={closeEntryModal}
                contentLabel="Добавить запись"
            >
                <AddingEntryForm closeModal={closeEntryModal} addEntry={addEntry}/>
            </Modal>

            <Modal
                isOpen={modalSubNodeIsOpen}
                onRequestClose={closeSubNodeModal}
                contentLabel="Добавить дочерний узел"
            >
                <AddingSubNodeForm closeModal={closeSubNodeModal} addSubNode={addSubNode}/>
            </Modal>

            <Navigation filter={(name, type)=>{filter(type, name)}} data={store.data.data} removeSubNode={removeSubNode} openModal={nodeModal} openEntryModal={openEntryModal} removeNode={removeNode} openSubNodeModal={openSubNodeModal}/>
        </div>
    )
})

export default NavigationContainer;