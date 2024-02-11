import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    itemContainer: {
        backgroundColor: '#8E8E8E',
        padding: '1px 5px 1px 7px',
        cursor: 'pointer',
        color: '#FFB800',
        textShadow: '1px 1px 2px #000',
        wordBreak: 'break-word',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#6C6C6C',
        },
    },

    innerLeftPanel: {
        display: "block",
        flexWrap: 'wrap',
    },

    innerRightPanel: {
        display: "flex",
    },
});

export default useStyles;