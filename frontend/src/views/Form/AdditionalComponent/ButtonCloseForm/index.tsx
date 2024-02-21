import {Button} from "@material-ui/core";
import React, {FC} from "react";
import {IButtonClose} from "./interface";


const ButtonCloseForm: FC<IButtonClose> = ({onClickAction}) => {
    const textBtn: string = 'Закрыть';

    return(
        <Button variant="contained" color="secondary" onClick={onClickAction}>
            {textBtn}
        </Button>
    )
}

export default ButtonCloseForm;