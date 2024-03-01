import {createUseStyles} from "react-jss";


const useStyle = createUseStyles({
    errorMessage: {
        color: 'red',
        fontFamily: '"Roboto",' +
            ' "Helvetica", "Arial", sans-serif',
        textAlign: 'center'
    },

    headerText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        overflowWrap: 'break-word',
    },

    headerText2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        textAlign: 'center',
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        justifyContent: 'space-between',
        overflowWrap: 'break-word',
        height: '70vh'
    },

    leftContainer: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'start',
        overflowWrap: 'anywhere',
        width: '35%',
        marginRight: '20px',
    },

    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'orange',
        width: '65%',
        padding: '10px',
        overflow: 'auto',
    },

    innerRightContainer: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },

    btn: {
        marginBottom: '10px',
    },
})

export default useStyle;