
export interface IForm {
    closeModal: ()=>void;
    addNode: ()=>Promise<boolean>;
}