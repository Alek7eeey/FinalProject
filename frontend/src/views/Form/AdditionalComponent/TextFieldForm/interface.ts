import React from "react";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export interface ITextFieldForm{
    labelName: string,
    value: string,
    isAutoFocus: boolean,
    onChangeAction: (event: InputChangeEvent)=>void,
}