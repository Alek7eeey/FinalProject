import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
        mainContainer: {
            display: "flex",
            alignItems: 'baseline',
            justifyContent: 'start',
        },
        innerRightContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '12px',
            marginRight: '12px',
            width: '70%',
        },

        innerLeftContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '12px',
        width: '30%',
        overflow: 'auto',
        maxHeight: '95vh'
        },
    }
);

export default useStyles;