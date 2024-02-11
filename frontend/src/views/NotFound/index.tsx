import {ReactElement} from "react";
import useStyle from "./style";

const Error = ():ReactElement => {
    const classes = useStyle();
    const errorDescription: string = 'error 404: page not found!';
    return (
        <div className={classes.errorContainer}>
            <h1>{errorDescription}</h1>
        </div>
    )
}

export default Error;