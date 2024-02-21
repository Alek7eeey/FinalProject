import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import types from "../../../enumTypes";
import {IForm} from "./interface";
import formStore from "../../../store/stateInComponent/form";
import {observer} from "mobx-react";
import useStyle from "../style";
import TextFieldForm from "../AdditionalComponent/TextFieldForm";
import ButtonAddForm from "../AdditionalComponent/ButtonAddForm";
import ButtonCloseForm from "../AdditionalComponent/ButtonCloseForm";
import {menuItemConfig} from "./menuItemConfig";

const NodeForm: FC<IForm> = observer(({closeModal, addNode}) => {

    const classes = useStyle();
    type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
    type InputTypeChange = React.ChangeEvent<{ value: unknown }>;

    const handleInputChange = (event: InputChangeEvent):void => {
        formStore.setName(event.target.value);
    };

    const handleTypeChange = (event: InputTypeChange):void => {
        formStore.setType(event.target.value as types);
    };

    return (
        <>
            <h2 className={classes.headerText}>Добавить узел 2-ого уровня</h2>
            <ButtonCloseForm onClickAction={closeModal}/>
            <form>
                <FormControl fullWidth margin="normal">
                    <TextFieldForm isAutoFocus={true} value={formStore.name} labelName={"Название узла"} onChangeAction={handleInputChange}/>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-label">Выберите тип</InputLabel>
                    <Select labelId="select-label" value={formStore.type} onChange={handleTypeChange}>
                        {menuItemConfig.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <ButtonAddForm addAction={addNode}/>
                </FormControl>
            </form>

            {(formStore.emptyFieldError || formStore.duplicateNameError) &&
                <p className={classes.errorMessage}>
                    {formStore.errorDescription}
                </p>}
        </>
    );
});

export default NodeForm;
