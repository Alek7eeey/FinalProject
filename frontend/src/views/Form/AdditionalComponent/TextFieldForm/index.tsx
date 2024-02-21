import {TextField} from "@material-ui/core";
import React, {FC} from "react";
import {ITextFieldForm} from "./interface";
import {observer} from "mobx-react";


const TextFieldForm: FC<ITextFieldForm> = observer(({labelName, value, isAutoFocus, onChangeAction}) =>{
    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus={isAutoFocus}
            label={labelName}
            value={value}
            onChange={onChangeAction}
        />
    )
});

export default TextFieldForm;
