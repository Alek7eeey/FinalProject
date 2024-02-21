import {flow, types} from "mobx-state-tree";
import {Menu} from "../menu";
import {axiosGet} from "../../../axios";
import config from "../../../config.json";
import {rootNodeName, serverPaths} from "../../../constants";
import store from "../index";
import enumTypes from "../../../enumTypes";
import {INode, ISubNode} from "./interfaces";

const Store = types.model('Store', {
    data: types.optional(Menu, {nodes:[]})
})
    .actions(self => ({
        getDataFromServer: flow(function* () {
            yield axiosGet(config.server.url + serverPaths.getAllData).then(res => {
                const items = JSON.parse(JSON.stringify(res.data));
                for (const item of items) {
                    const {name, type, parentName, entries} = item;

                    if (parentName === rootNodeName) {
                        store.addNodeToStore(name, type);
                    } else {
                        store.addSubNodeToParent(name, type, parentName, entries);
                    }
                }
            }).catch(error => {
                alert(error);
            });
        }),

        addNodeToStore(name: string, type: string) {
            const existingNode = store.data.nodes.find((node: INode) =>
                node.nodeName === name && node.nodeType === type);

            if (!existingNode) {
                store.data.addNode(name, type, false);
            }
        },

        addSubNodeToParent(name: string, type: string, parentName: string, entries: any) {
            const parentNode = store.data.nodes.find((node: INode) =>
                node.nodeName === parentName && node.nodeType === type);

            if (parentNode) {
                let childNode = parentNode.subNodes.find((subNode: ISubNode) =>
                    subNode.name === name && subNode.type === type);

                if (!childNode) {
                    parentNode.addSubNode(name, type, parentNode.nodeName, false);
                    childNode = parentNode.subNodes.find((subNode: ISubNode) =>
                        subNode.name === name && subNode.type === type);
                }

                if (childNode && entries) {
                    entries.forEach((entry: any) => {
                        const existingEntry = childNode.entries.find((e: { id: number; }): boolean => e.id === entry.id);
                        if (!existingEntry) {
                            childNode.addEntry(entry.id, entry.name, entry.type, entry.description, childNode.name, entry.parentName, false);
                        }
                    });
                }
            }
        },

        getEntries:flow(function* (type = enumTypes.default, nameNode = rootNodeName) {
            yield store.getDataFromServer();
            if (type === enumTypes.default) {
                return self.data.nodes.flatMap(node =>
                    node.subNodes.flatMap(subNode =>
                        subNode.entries
                    )
                );
            } else {
                const result = self.data.nodes.flatMap(node =>
                    node.subNodes.flatMap(subNode =>
                        subNode.entries.filter(entry => entry.type === type
                            && entry.parentName === nameNode)
                    ))
                if (result.length > 0) {
                    return result;
                }

                return (self.data.nodes.filter(node =>
                        node.nodeName === nameNode && node.nodeType === type)
                        .flatMap(subNode =>
                            subNode.subNodes.flatMap(entry => entry.entries || [])
                        )
                );

            }
        }),
    }));

export default Store;