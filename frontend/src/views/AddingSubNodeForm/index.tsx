import React, {FC, ReactElement, useEffect, useState} from 'react';
import { Button, TextField,} from '@material-ui/core';

interface IForm {
    closeModal: ()=>void;
    addSubNode: (name: string)=>Promise<boolean>;
}
const SubNodeForm: FC<IForm> = ({closeModal, addSubNode}):ReactElement => {
    const [nodeName, setNodeName] = useState<string>('');
    const[error, setError]=useState<boolean>(false);
    const[error2, setError2]=useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setNodeName(event.target.value);
    };

    const handleAddNode = async():Promise<void> => {
        if (!nodeName) {
            setError(true);
        } else {
            const result = await addSubNode(nodeName);
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
            <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Добавить узел 3-ого уровня</h2>
            <Button variant="contained" color="secondary" onClick={closeModal}>
                Закрыть
            </Button>
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="uniqueNodeId"
                    label="Название узла"
                    name="uniqueNodeName"
                    value={nodeName}
                    onChange={handleInputChange}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAddNode}
                >
                    Добавить
                </Button>
            </form>
            {error && <p style={{color: 'red', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center'}}>Необходимо выбрать тип и ввести название для узла!</p>}
            {error2 && <p style={{color: 'red', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center'}}>Названия узлов не должны повторяться!</p>}
       </div>
    );
}

export default SubNodeForm;
