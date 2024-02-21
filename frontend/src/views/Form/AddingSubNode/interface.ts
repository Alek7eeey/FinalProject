export interface IForm {
    closeModal: ()=>void;
    addSubNode: ()=>Promise<boolean>;
}