import useStyle from "./style";

const Error = () => {
    const classes = useStyle();
    const errorDescription: string = 'Error 404: page not found!';
    return (
        <div className={classes.errorContainer}>
            <h1>{errorDescription}</h1>
        </div>
    )
}

export default Error;