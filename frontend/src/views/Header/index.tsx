import {ReactElement} from "react";
import useStyles from "./style";

const Index = ():ReactElement => {
    const classes = useStyles();
    return(
        <div className={classes.text}>
            <h1>Navigator</h1>
        </div>
    )
}

export default Index;