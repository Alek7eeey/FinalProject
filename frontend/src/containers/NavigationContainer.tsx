import Navigation from "../views/Navigation/Menu";
import React, {FC} from "react";
import Modal from "react-modal";
import AddingNodeForm from "../views/Form/AddingNode";
import AddingEntryForm from "../views/Form/AddingEntry";
import store from "../store/main";
import AddingSubNodeForm from "../views/Form/AddingSubNode";
import types from "../enumTypes";
import {INavigation, INode, ISubNode} from "./interfaces";
import modalWindowStore from "../store/stateInComponent/modalWindow";
import { observer } from 'mobx-react';
import currentNameStore from "../store/stateInComponent/currentNames";
import formStore from "../store/stateInComponent/form";

const NavigationContainer: FC<INavigation> = observer(({filter}) => {

    const removeNode = async (name: string, type: string): Promise<void> => {
        const currentNode = store.data.nodes.find((node: { nodeName: string; }) => node.nodeName === name);
        if(currentNode){
            for (const subNode of currentNode.subNodes) {
                await currentNode.removeSubNode(subNode.name, currentNode.nodeType, currentNode.nodeName);
            }
        }
        await store.data.removeNode(name, type);
        filter(type as types, name);
    }

    const removeSubNode = async (name: string, parentName: string): Promise<void> => {
        const parentNode = store.data.nodes.find((node: { nodeName: string; }) => node.nodeName === parentName);

        if (parentNode) {
            await parentNode.removeSubNode(name, parentNode.nodeType, parentNode.nodeName);
            filter(parentNode.nodeType as types, name);
        } else {
            console.error(`Узел с именем ${parentName} не найден`);
        }
    }

    const checkAndAddNode = async():Promise<boolean> => {
        formStore.setCleanAllError();
        let result: boolean = true;

        if (formStore.name.length <= 0 || formStore.type.length <= 0) {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
        } else {
            result = await addNode(formStore.name, formStore.type as types);
            if (!result) {
                if(!formStore.duplicateNameError) formStore.setDuplicateNameError();
            }
        }

        return result;
    }
    const addNode = async (name: string, type: types): Promise<boolean> => {
        const countSuchNodes: number = store.data.nodes.filter((node: { nodeName: string; }) => node.nodeName === name).length;

        if (countSuchNodes > 0) return false;

        await store.data.addNode(name, type as string, true);
        modalWindowStore.setStateNodeModal();
        filter(type, name);

        return true;
    }

    const checkAndAddSubNode = async() => {
        let result: boolean = true;
        formStore.setCleanAllError();
        if (formStore.name.length<=0) {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
        } else {
            result = await addSubNode(formStore.name);
            if (!result) {
                if(!formStore.duplicateNameError) formStore.setDuplicateNameError()
            }
        }

        return result;
    }
    const addSubNode = async (name: string): Promise<boolean> => {
        const parentNode = store.data.nodes.find((node: INode) =>
            node.nodeName === currentNameStore.currentParentNode && node.nodeType === currentNameStore.currentParentTypeNode);

        if (!parentNode) return false;

        const countSuchSubNodes: number = parentNode.subNodes.filter((subNode: { name: string; }) => subNode.name === name).length;
        if ( countSuchSubNodes> 0) return false;

        await parentNode.addSubNode(name, parentNode.nodeType, parentNode.nodeName, true);
        modalWindowStore.setStateSubNodeModal();
        filter(parentNode.nodeType as types, name);

        return true;
    }

    const checkAndAddEntry = async ():Promise<void> =>{
        formStore.setCleanAllError();
        if(formStore.name.length>0 && formStore.description.length>0) {
            await addEntry(formStore.name, formStore.description);
        }
        else {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
        }
    }
    const addEntry = async (name: string, description: string): Promise<void> => {
        const parentNode = store.data.nodes.find((node: INode) =>
            node.nodeName === currentNameStore.currentParentNode && node.nodeType === currentNameStore.currentParentTypeNode);

        if (parentNode) {
            const childNode = parentNode?.subNodes.find((subNode: ISubNode) =>
                subNode.name === currentNameStore.currentChildNode && subNode.type === currentNameStore.currentParentTypeNode);

            if (childNode) {
                const defaultId: number = -1;
                await childNode.addEntry(defaultId, name, parentNode.nodeType, description, childNode.name, parentNode.nodeName, true);
                filter(parentNode.nodeType as types, childNode.name);
            } else {
                console.error(`Узел с именем ${currentNameStore.currentParentNode} не найден`);
            }
        }
        modalWindowStore.setStateEntryModal();
    }

    const modalConfig = [
        {
            isOpen: modalWindowStore.stateNodeModal,
            onRequestClose: modalWindowStore.setStateNodeModal,
            component: <AddingNodeForm closeModal={modalWindowStore.setStateNodeModal} addNode={checkAndAddNode} />,
        },
        {
            isOpen: modalWindowStore.stateEntryModal,
            onRequestClose: modalWindowStore.setStateEntryModal,
            component: <AddingEntryForm closeModal={modalWindowStore.setStateEntryModal} addEntry={checkAndAddEntry} />,
        },
        {
            isOpen: modalWindowStore.stateSubNodeModal,
            onRequestClose: modalWindowStore.setStateSubNodeModal,
            component: <AddingSubNodeForm closeModal={modalWindowStore.setStateSubNodeModal} addSubNode={checkAndAddSubNode} />,
        },
    ];

    return (
        <>
            {modalConfig.map((modal, index) => (
                <Modal
                    key={index}
                    isOpen={modal.isOpen}
                    onRequestClose={modal.onRequestClose}
                >
                    {modal.component}
                </Modal>
            ))}

            <Navigation filter={(name, type) => {
                filter(type, name)
            }}
                        data={store.data.nodes}
                        removeSubNode={removeSubNode}
                        openModal={modalWindowStore.setStateNodeModal}
                        openEntryModal={modalWindowStore.openEntryModal}
                        removeNode={removeNode}
                        openSubNodeModal={modalWindowStore.openSubNodeModal}/>
        </>
    )
})
export default NavigationContainer;