import {Button, TextField} from '@material-ui/core';
import React, {FC, ReactElement, useState} from 'react';

interface IForm {
    closeModal: ()=>void;
    addEntry: (entryName: string, entryDescription: string)=>void;
}
const EntryForm: FC<IForm> = ({closeModal, addEntry}):ReactElement => {
    const [entryName, setEntryName] = useState<string>('');
    const [entryDescription, setEntryDescription] = useState<string>();
    const[error, setError]=useState<boolean>(false);

    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setEntryName(event.target.value);
    };

    const handleInputDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setEntryDescription(event.target.value);
    };

    const addNewEntry = ():void => {
        if(entryName && entryDescription) {
            addEntry(entryName, entryDescription);
        }
        else {
            setError(true);
        }
    }

    return (
        <div>
            <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Добавить запись</h2>
            <Button variant="contained" color="primary" onClick={closeModal}>
                Закрыть
            </Button>
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                    id="uniqueEntryId"
                    label="Название записи"
                    name="uniqueEntryName"
                    onChange={handleInputNameChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="uniqueEntryIdDescription"
                    label="Описание записи"
                    name="uniqueEntryNameDescription"
                    onChange={handleInputDescriptionChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    onClick={addNewEntry}
                >
                    Добавить
                </Button>
            </form>
            {error && <p style={{color: 'red', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textAlign: 'center'}}>Необходимо указать название записи и его описание!</p>}

        </div>
    );
}

export default EntryForm;
