const verifyData = <T>(data: T) => {
    for (const property in data) {
        if (Object.prototype.hasOwnProperty.call(data, property)) {
            const toVerify = String(data[property]).trim()

            if (toVerify === undefined || toVerify === '' || toVerify === null)
                throw new Error('Preencha todos os campos obrigatórios!')
        }
    }
}

export default verifyData
