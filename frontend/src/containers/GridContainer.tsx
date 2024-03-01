import Grid from "../views/Grid";
import {observer} from "mobx-react-lite";
import React, {FC} from "react";
import types from "../enumTypes";
import {IGridContainer} from "./interfaces";
import modalWindowStore from "../store/stateInComponent/modalWindow";
import EntryInfo from "../views/EntryInfo";
import Modal from "react-modal";
import currentNameStore from "../store/stateInComponent/currentNames";
import formStore from "../store/stateInComponent/form";
import entryFileStore from "../store/main/entryFile";

const GridContainer:FC<IGridContainer> = observer(({data}) => {

    //обработка нажатия на запись
    const clickEntry = (name: string, type: types, description: string, parentName: string, id:number):void => {
        currentNameStore.setCurrentEntry(name);
        formStore.setDescription(description);
        formStore.setType(type);
        formStore.setParentName(parentName);
        entryFileStore.setId(id);
        modalWindowStore.setStateEntryInfoModal();
    }

    //добавление файла к записи
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>):Promise<void> => {
        await entryFileStore.setFile(event);
    }

    const modalConfig = [
        {
            isOpen: modalWindowStore.stateEntryInfoModal,
            onRequestClose: modalWindowStore.setStateEntryInfoModal,
            component: <EntryInfo
                nameEntry={currentNameStore.currentEntry}
                descriptionEntry={formStore.description}
                typeEntry={formStore.type as types}
                parentName={formStore.parentName}
                idEntry = {entryFileStore.entryId}
                handleFileChange={handleFileChange}/>,
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

            <Grid data={data} clickEntry={clickEntry}/>
        </>
    )
})

export default GridContainer;