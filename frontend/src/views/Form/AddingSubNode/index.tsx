import React, {FC} from 'react';
import {IForm} from "./interface";
import formStore from "../../../store/stateInComponent/form";
import {observer} from "mobx-react";
import useStyle from "../style";
import TextFieldForm from "../AdditionalComponent/TextFieldForm";
import ButtonAddForm from "../AdditionalComponent/ButtonAddForm";
import ButtonCloseForm from "../AdditionalComponent/ButtonCloseForm";

const SubNodeForm: FC<IForm> = observer(({closeModal, addSubNode}) => {

    const classes = useStyle();
    type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

    const handleInputChange = (event: InputChangeEvent):void => {
        formStore.setName(event.target.value);
    };

    return (
        <>
            <h2 className={classes.headerText}>Добавить узел 3-ого уровня</h2>
            <ButtonCloseForm onClickAction={closeModal}/>
            <form>
                <TextFieldForm isAutoFocus={true} value={formStore.name} labelName={"Название узла"} onChangeAction={handleInputChange}/>
                <ButtonAddForm addAction={addSubNode}/>
            </form>

            {(formStore.emptyFieldError || formStore.duplicateNameError) &&
                <p className={classes.errorMessage}>
                    {formStore.errorDescription}
                </p>}
       </>
    );
})

export default SubNodeForm;
