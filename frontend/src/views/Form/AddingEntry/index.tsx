import React, {FC} from 'react';
import {IForm} from "./interface";
import formStore from "../../../store/stateInComponent/form";
import {observer} from "mobx-react";
import useStyle from "../style";
import TextFieldForm from "../AdditionalComponent/TextFieldForm";
import ButtonAddForm from "../AdditionalComponent/ButtonAddForm";
import ButtonCloseForm from "../AdditionalComponent/ButtonCloseForm";

const EntryForm: FC<IForm> = observer(({closeModal, addEntry}) => {
    const classes = useStyle();
    type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

    const handleInputNameChange = (event: InputChangeEvent):void => {
        formStore.setName(event.target.value);
    };

    const handleInputDescriptionChange = (event: InputChangeEvent):void => {
        formStore.setDescription(event.target.value);
    };

    return (
        <>
            <h2 className={classes.headerText}>Добавить запись</h2>
            <ButtonCloseForm onClickAction={closeModal}/>
            <form>
                <TextFieldForm isAutoFocus={true} value={formStore.name} labelName={"Название записи"} onChangeAction={handleInputNameChange}/>
                <TextFieldForm isAutoFocus={false} value={formStore.description} labelName={"Описание записи"} onChangeAction={handleInputDescriptionChange}/>
                <ButtonAddForm addAction={addEntry}/>
            </form>

            {(formStore.emptyFieldError || formStore.duplicateNameError) &&
                <p className={classes.errorMessage}>
                    {formStore.errorDescription}
                </p>}

        </>
    );
});

export default EntryForm;
