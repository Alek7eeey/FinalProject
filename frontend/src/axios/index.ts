import axios from 'axios';

export const getAllData = async(): Promise<string> => {
    return axios.get('https://localhost:7198/navigator/nodes',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return JSON.stringify(response.data);
        })
        .catch(error => {
            alert('Ошибка при получении информации с сервера: ' + error);
            throw error;
        });
}

export const createNode = async(name: string, type: string, parentName: string): Promise<void> => {
    const data = {
        name: name,
        type: type,
        parentName: parentName
    };

    await axios.post('https://localhost:7198/navigator/createNode', data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .catch(error =>
        {
            alert('Ошибка при создании нового узла: '  + error);
            throw error;
        });
}

export const createEntry = async(name: string, type: string, parentName: string, childNodeName: string, description: string):Promise<any> => {
    const data = {
        name: name,
        type: type,
        description: description,
        parentName: parentName,
        childNodeName: childNodeName
    };

    return await axios.post('https://localhost:7198/navigator/createEntry', data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            alert('Ошибка при создании новой записи: '  + error);
            throw error;
        });
}


export const deleteNode = async (name: string, type: string, parentName: string): Promise<void> => {
    const data = {
        name: name,
        type: type,
        parentName: parentName
    };

    await axios.delete('https://localhost:7198/navigator/deleteNode', {
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .catch(error =>
        {
            alert('Ошибка при удалении узла: '  + error);
            throw error;
        });
}



