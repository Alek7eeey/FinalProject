import {types} from "mobx-state-tree";


const FilterDataModel = types.model({
    filterData: types.optional(types.frozen<any>(), []),
})
    .actions(self => ({
        setFilterData(entries: Array<any>):void {
            self.filterData = entries;
        },
    }))
;

const defaultValue = {
    filterData: []
}
const filterDataStore= FilterDataModel.create(defaultValue);
export default filterDataStore;