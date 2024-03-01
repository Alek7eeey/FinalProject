
export enum Error {
    nodeNotFoundError = 'Узел с текущим именем не найден!',
    jsonError = 'Ошибка: предоставленные данные не соответствуют формату JSON.',
    duplicateNameError = 'Названия не могут дублироваться!\n',
    emptyFieldError = 'Все поля должны быть заполнены!\n',
    nameIsToLongError = 'Имя не может содержать такое количество символов!\n',
    invalidFileTypeError = 'Не правильный формат файла!\n',
    fileTooBigError = 'Размер файла превышает 5 мб!\n',
    pageNotFound = 'Error 404: page not found!',
}

export default Error;