import {Button} from "@material-ui/core";
import React, {FC} from "react";
import {IButtonAdd} from "./interface";


const ButtonAddForm:FC<IButtonAdd> = ({addAction}) => {
    const textBtn: string = 'Добавить';
    return(
        <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={addAction}
        >
         {textBtn}
        </Button>
    )
}

export default ButtonAddForm;