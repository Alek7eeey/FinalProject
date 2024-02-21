import {createUseStyles} from "react-jss";


const useStyle = createUseStyles({
    errorMessage: {
        color: 'red',
        fontFamily: '"Roboto",' +
            ' "Helvetica", "Arial", sans-serif',
        textAlign: 'center'
    },

    headerText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
})

export default useStyle;