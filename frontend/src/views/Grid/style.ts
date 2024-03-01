import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
    container: {
        overflowX: 'auto',
        maxHeight: '85vh',
        // wordBreak: 'break-all',
        overflowWrap: 'break-word',
    },
    row: {
        '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
        }
    },
});

export default useStyles;