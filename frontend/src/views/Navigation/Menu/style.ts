import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        width: '100%',
        backgroundColor: '#f7f7f7',
        border: '1px solid #ddd',
        borderRadius: '4px',
        '& ul': {
            listStyleType: 'none',
            padding: 0,
            '& li': {
                padding: '8px 16px',
                '& ul': {
                    '& li': {
                        cursor: 'pointer',
                        paddingLeft: '20px',
                        borderLeft: '1px solid #ddd',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                    '& li:hover': {

                    }
                },
            },
        },
    },

    itemContainer: {
        backgroundColor: '#8E8E8E',
        padding: '1px 5px 1px 7px',
        cursor: 'pointer',
        color: '#FFB800',
        textShadow: '1px 1px 2px #000',
        overflowWrap: 'break-word',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#6C6C6C',
        },
    },

    subItem: {
        marginTop: '5px',
        wordBreak: 'break-all',
        '&:hover': {
            boxShadow: '1px 1px 2px black'
        },
    },

});

export default useStyles;