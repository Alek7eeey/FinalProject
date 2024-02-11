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
            width: '100%',
        },

        innerLeftContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '12px',
        width: '35%',
        overflow: 'auto',
        maxHeight: '95vh'
        },
    }
);

export default useStyles;