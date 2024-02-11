import {createUseStyles} from "react-jss";


const useStyles = createUseStyles({
    container: {
        overflowX: 'auto',
        maxHeight: '85vh'
    },
    row: {
        '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
        }
    },
});

export default useStyles;