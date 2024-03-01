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
import errorDescription from "../errorDescription";

const NavigationContainer: FC<INavigation> = observer(({filter}) => {

    const removeSpaces = (value:string):string=>
    {
        return  value.replace(/\s/g, '');
    }

    const removeNode = async (name: string, type: string): Promise<void> => {
        const currentNode = store.data.nodes.find((node: { nodeName: string; }) => node.nodeName === name);
        if(!currentNode)
        {
            console.error(errorDescription.nodeNotFoundError);
            return ;
        }

        for (const subNode of currentNode.subNodes) {
            await currentNode.removeSubNode(subNode.name, currentNode.nodeType, currentNode.nodeName);
        }
        await store.data.removeNode(name, type);
        filter(type as types, name);
    }

    const removeSubNode = async (name: string, parentName: string): Promise<void> => {
        const parentNode = store.data.nodes.find((node: { nodeName: string; }) => node.nodeName === parentName);

        if (!parentNode) {
            console.error(errorDescription.nodeNotFoundError);
            return ;
        }

        await parentNode.removeSubNode(name, parentNode.nodeType, parentNode.nodeName);
        filter(parentNode.nodeType as types, name);
    }

    const checkAndAddNode = async(): Promise<boolean> => {
        formStore.setCleanAllError();
        const result: boolean = true;
        const nameWithoutSpace: string = removeSpaces(formStore.name);
        const type: string = formStore.type;

        if(nameWithoutSpace.length >= 150) {
            formStore.setNameIsToLongError();
            return false;
        }

        if (nameWithoutSpace.length <= 0 || type.length <= 0) {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
            return false;
        }

        const addNodeResult = await addNode(formStore.name, formStore.type as types);
        if (!addNodeResult) {
            if(!formStore.duplicateNameError) formStore.setDuplicateNameError();
            return false;
        }

        return result;
    }

    const addNode = async (name: string, type: types): Promise<boolean> => {
        const countSuchNodes: number = store.data.nodes.filter((node: { nodeName: string; }) =>
            removeSpaces(node.nodeName) === removeSpaces(name)).length;

        if (countSuchNodes > 0) return false;

        await store.data.addNode(name, type as string, true);
        modalWindowStore.setStateNodeModal();
        filter(type, name);

        return true;
    }

    const checkAndAddSubNode = async():Promise<boolean> => {
        formStore.setCleanAllError();
        const result: boolean = true;
        const nameWithoutSpace: string = removeSpaces(formStore.name);

        if(nameWithoutSpace.length >= 150) {
            formStore.setNameIsToLongError();
            return false;
        }

        if (nameWithoutSpace.length <= 0) {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
            return false;
        }

        const addSubNodeResult = await addSubNode(formStore.name);
        if (!addSubNodeResult) {
            if(!formStore.duplicateNameError) formStore.setDuplicateNameError();
            return false;
        }

        return result;
    }

    const addSubNode = async (name: string): Promise<boolean> => {
        const parentNode = store.data.nodes.find((node: INode) =>
            node.nodeName === currentNameStore.currentParentNode && node.nodeType === currentNameStore.currentParentTypeNode);

        if (!parentNode) return false;

        const countSuchSubNodes: number = parentNode.subNodes.filter((subNode: { name: string; }) =>
            removeSpaces(subNode.name) === removeSpaces(name)).length;
        if ( countSuchSubNodes> 0) return false;

        await parentNode.addSubNode(name, parentNode.nodeType, parentNode.nodeName, true);
        modalWindowStore.setStateSubNodeModal();
        filter(parentNode.nodeType as types, name);

        return true;
    }

    const checkAndAddEntry = async (): Promise<void> => {
        formStore.setCleanAllError();
        const nameWithoutSpace: string = removeSpaces(formStore.name);
        const descriptionWithoutSpace: string = removeSpaces(formStore.description);

        if(nameWithoutSpace.length >= 150 || descriptionWithoutSpace.length >= 300) {
            formStore.setNameIsToLongError();
            return;
        }

        if(nameWithoutSpace.length <= 0 || descriptionWithoutSpace.length <= 0) {
            if(!formStore.emptyFieldError) formStore.setEmptyFieldError();
            return;
        }

        await addEntry(formStore.name, formStore.description);
    }

    const addEntry = async (name: string, description: string): Promise<void> => {
        const parentNode = store.data.nodes.find((node: INode) =>
            node.nodeName === currentNameStore.currentParentNode && node.nodeType === currentNameStore.currentParentTypeNode);

        if (parentNode) {
            const childNode = parentNode?.subNodes.find((subNode: ISubNode) =>
                subNode.name === currentNameStore.currentChildNode && subNode.type === currentNameStore.currentParentTypeNode);

            if (!childNode) {
                console.error(errorDescription.nodeNotFoundError);
                return ;
            }

            const defaultId: number = -1;
            await childNode.addEntry(defaultId, name, parentNode.nodeType, description, childNode.name, parentNode.nodeName, true);
            filter(parentNode.nodeType as types, childNode.name);
        }

        modalWindowStore.setStateEntryModal();
    }

    //модальные окна для добавления узлов и записей
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