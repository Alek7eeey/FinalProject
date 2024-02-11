import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField,} from '@material-ui/core';
import types from "../../enumTypes";

interface IForm {
    closeModal: ()=>void;
    addNode: (name: string, type: types)=>Promise<boolean>;
}
const NodeForm: FC<IForm> = ({closeModal, addNode}):ReactElement => {
    const [nodeName, setNodeName] = useState<string>('');
    const [nodeType, setNodeType] = useState<types>();
    const[error, setError]=useState<boolean>(false);
    const[error2, setError2]=useState<boolean>(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setNodeName(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>):void => {
        setNodeType(event.target.value as types);
    };

    const handleAddNode = async():Promise<void> => {
        if (!nodeName || !nodeType) {
            setError(true);
        } else {
            const result = await addNode(nodeName, nodeType);
            if (!result) {
                setError2(true)
            }
        }
    };

    useEffect(() => {
        if (error2) {
            const timer = setTimeout(() => {
                setError2(false);
            }, 3000);

            return () => clearTimeout(timer);
        }

        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error2, error]);

    return (
        <div>
            <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Добавить узел 2-ого уровня</h2>
            <Button variant="contained" color="secondary" onClick={closeModal}>
                Закрыть
            </Button>
            <form>
                <FormControl fullWidth margin="normal">
                    <TextField
                        variant="outlined"
                        required
                        autoFocus
                        id="uniqueNodeId"
                        label="Название узла"
                        name="uniqueNodeName"
                        value={nodeName}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-label">Выберите тип</InputLabel>
                    <Select labelId="select-label" value={nodeType} onChange={handleTypeChange}>
                        <MenuItem value={"type1"}>{types.typeOne}</MenuItem>
                        <MenuItem value={"type2"}>{types.typeTwo}</MenuItem>
                        <MenuItem value={"type3"}>{types.typeThree}</MenuItem>
                        <MenuItem value={"type4"}>{types.typeFour}</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddNode}
                    >
                        Добавить
                    </Button>
                </FormControl>
            </form>
            {error && <p style={{color: 'red', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center'}}>Необходимо выбрать тип и ввести название для узла!</p>}
            {error2 && <p style={{color: 'red', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center'}}>Названия узлов не должны повторяться!</p>}
        </div>
    );
}

export default NodeForm;
