import {ReactElement, useEffect, useState} from "react";
import NavigationContainer from "./NavigationContainer";
import Header from "../views/Header";
import useStyles from "./style";
import GridContainer from "./GridContainer";
import Store from "../store";
import {observer} from "mobx-react-lite";
import enumTypes from "../enumTypes";
import types from "../enumTypes";
import store from "../store";

const Index =  observer(():ReactElement => {
    const defaultValue: string = 'Объекты';
    const classes = useStyles();
    const [filterData, setFilterData] = useState<any>([]);
    const filter = async (type= enumTypes.default, nameNode=defaultValue): Promise<void> => {
        if(type===types.default && nameNode === defaultValue)
        {
            const entries = await store.getEntries();
            setFilterData(Array.from(entries));
        }
        else
        {
            const entries = await Store.getEntries(type, nameNode);
            setFilterData(Array.from(entries));
        }
    }

    useEffect(() => {
        filter();
    }, []);

    return(
        <div className={classes.mainContainer}>
            <div className={classes.innerLeftContainer}>
                <NavigationContainer filter={filter}/>
            </div>
            <div className={classes.innerRightContainer}>
                <Header/>
                <GridContainer data={filterData}/>
            </div>
        </div>
    )
})

export default Index;