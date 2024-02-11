import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    subItem: {
        margin: '5px 7px 0px 7px',
        padding: '1px 5px 1px 7px',
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        wordBreak: 'break-word',
        '&:hover': {
            boxShadow: '1px 1px 2px black'
        },
    },

    innerLeftPanel: {
        display: "flex",
        flexWrap: 'wrap',
    },

    innerRightPanel: {
        display: "flex",
    },

});

export default useStyles;