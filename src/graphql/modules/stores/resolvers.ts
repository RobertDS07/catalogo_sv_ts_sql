import Store from "../../../models/Store"

interface storeInfo {
    storeName: string
}

export const resolvers = {
    storeNamesToLink: async () => {
        const allStoreNamesToLink = await Store.findAll({ attributes: ['storeNameToLink'] })

        return allStoreNamesToLink
    },
    storeInfo: async ({storeName}: storeInfo) => {
        try {
            const storeInfo = await Store.findOne({ where: { storeNameToLink: storeName } })

            if(!storeInfo) throw new Error()

            return storeInfo
        } catch(e) {
            if(!!e) e = new Error('Algo inesperado ocorreu por favore tente novamente, se o erro persistir conatate o dono do site.')
            return e 
        }
    }
}