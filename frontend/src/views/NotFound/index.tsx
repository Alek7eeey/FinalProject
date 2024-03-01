import useStyle from "./style";
import errorDescription from "../../errorDescription";

const Error = () => {
    const classes = useStyle();
    return (
        <div className={classes.errorContainer}>
            <h1>{errorDescription.pageNotFound}</h1>
        </div>
    )
}

export default Error;