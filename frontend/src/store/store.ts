import {flow, types} from "mobx-state-tree";
import enumTypes from "../enumTypes";
import {createEntry, createNode, deleteNode, getAllData} from "../axios";
import store from "./index";

const Entry = types.model({
    id: types.number,
    name: types.string,
    type: types.string,
    description: types.string,
    parentName: types.string
});

const SubNode = types.model({
    name: types.string,
    type: types.string,
    entries: types.array(Entry),
    idCounter: types.optional(types.number, 1),
})
    .actions(self => ({
        addEntry: flow(function*(id:number, name: string, type: string, description: string, childNodeName: string, parentName: string, toServer: boolean) {
            if(toServer)
            {
                yield createEntry(name, type, parentName, childNodeName,description);
            }
            else {
                self.entries.push({id, name, type, description, parentName: childNodeName});
            }
        }),

        /*removeEntry: flow(function*(name: string, type: string) {
            const entryToRemove = self.entries.find((entry) => entry.name === name && entry.type === type);
            if (entryToRemove) {
                self.entries.remove(entryToRemove);
            }
        }),*/
    }));

const Node = types.model({
    nodeName: types.string,
    nodeType: types.string,
    subNodes: types.array(SubNode) || types.undefined || types.null,
})
    .actions(self => ({
        addSubNode : flow(function* (name:string, type:string, parentName: string, toServer: boolean) {
            if(toServer)
            {
                yield createNode(name, type as string, parentName);
            }
            self.subNodes.push({ name, type });
        }),
        removeSubNode: flow(function* (name:string, type:string, parentName: string) {
            const subNodeToRemove = self.subNodes.find((subNode) => subNode.name === name && subNode.type === type);
            if (subNodeToRemove) {
                yield deleteNode(name,type,parentName);
                self.subNodes.remove(subNodeToRemove);
            }
        }),
    }));

const Menu = types.model({
    data: types.array(Node),
})
    .actions(self => ({
        addNode: flow(function*(nodeName:string, nodeType:string, toServer: boolean){
            if(toServer)
            {
                const defaultValue:string = 'Объекты';
                yield createNode(nodeName, nodeType as string, defaultValue);
            }
            self.data.push({ nodeName, nodeType, subNodes: [] });
        }),

        removeNode: flow(function* (name:string, type: string) {
            const subNodeToRemove = self.data.find((node) => node.nodeName === name && node.nodeType === type);
            const defaultParentValue: string = 'Объекты';
            if (subNodeToRemove) {
                yield deleteNode(name, type, defaultParentValue);
                self.data.remove(subNodeToRemove);
            }
        }),
    }));

const Store = types.model('Store', {
    data: types.optional(Menu, {data:[]})
})
    .actions(self => ({
        getDataFromServer: flow(function*() {
            yield getAllData().then(res => {
                const items = JSON.parse(res);
                const rootNode:string = 'Объекты';
                for (const item of items) {
                    const { name, type, parentName, entries } = item;

                    if (parentName === rootNode) {
                        store.addNodeToStore(name, type);
                    } else {
                        store.addSubNodeToParent(name, type, parentName, entries);
                    }
                }
            }).catch(error => {
                alert(error);
            });
        }),

        addNodeToStore: flow(function*(name: string, type: string) {
            const existingNode = store.data.data.find((node: { nodeName: string; nodeType: string; }) => node.nodeName === name && node.nodeType === type);

            if (!existingNode) {
                yield store.data.addNode(name, type, false);
            }
        }),

        addSubNodeToParent: flow(function*(name: string, type: string, parentName: string, entries: any) {
            const parentNode = store.data.data.find((node: { nodeName: string; nodeType: string; }) => node.nodeName === parentName && node.nodeType === type);

            if (parentNode) {
                const existingSubNode = parentNode.subNodes.find((subNode: { name: string; type: string; }) => subNode.name === name && subNode.type === type);

                if (!existingSubNode) {
                    yield parentNode.addSubNode(name, type, parentNode.nodeName, false);
                }

                const childNode = parentNode.subNodes.find((subNode: { name: string; type: string; }) => subNode.name === name && subNode.type === type);

                if (childNode && entries) {
                    for (const entry of entries) {
                        const existingEntry = childNode.entries.find((e: { id: number; }):boolean => e.id === entry.id);
                        if (!existingEntry) {
                            yield childNode.addEntry(entry.id, entry.name, entry.type, entry.description, childNode.name, entry.parentName, false);
                        }
                    }
                }
            }
        }),

        getEntries: flow(function*(type= enumTypes.default, nameNode='Объекты'){
            yield store.getDataFromServer();
            if (type === enumTypes.default)
            {
                return self.data.data.flatMap(node =>
                    node.subNodes.flatMap(subNode =>
                        subNode.entries
                    )
                );
            }
            else {
                const result = self.data.data.flatMap(node =>
                    node.subNodes.flatMap(subNode =>
                        subNode.entries.filter(entry=> entry.type === type
                            && entry.parentName === nameNode)
                    ))
                if(result.length > 0){
                    return result;
                }

                return (self.data.data.filter(node =>
                        node.nodeName === nameNode && node.nodeType === type)
                        .flatMap(subNode=>
                            subNode.subNodes.flatMap(entry => entry.entries || [])
                        )
                );

            }
        })
    }));

export default Store;