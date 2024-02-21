import {useEffect} from "react";
import NavigationContainer from "./NavigationContainer";
import Header from "../views/Header";
import useStyles from "./style";
import GridContainer from "./GridContainer";
import { observer } from 'mobx-react';
import store from "../store/main";
import enumTypes from "../enumTypes";
import types from "../enumTypes";
import {rootNodeName} from "../constants";
import filterDataStore from "../store/stateInComponent/filterEntries";

const MainContainer =  observer(() => {
    const classes = useStyles();
    const filter = async (type:enumTypes= enumTypes.default, nameNode:string = rootNodeName): Promise<void> => {
        if(type===types.default && nameNode === rootNodeName)
        {
            const entries =await store.getEntries();
            filterDataStore.setFilterData(entries);
        }

        else
        {
            const entries = await store.getEntries(type, nameNode);
            filterDataStore.setFilterData(entries);
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
                <GridContainer data={filterDataStore.filterData}/>
            </div>
        </div>
    )
})

export default MainContainer;
