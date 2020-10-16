import Store from "../../../models/Store"

export const resolvers = {
    storeNamesToLink: async () => {
        const allStoreNamesToLink = await Store.findAll({ attributes: ['storeNameToLink'] })

        return allStoreNamesToLink
    },
    storeInfo: async (storeName: string) => {
        try {
            const storeInfo = await Store.findOne({ where: { storeNameToLink: storeName } })

            if(!storeInfo) throw new Error()

            return storeInfo
        } catch(e) {
            return new Error('Algo inesperado ocorreu por favore tente novamente, se o erro persistir conatate o dono do site.')
        }
    }
}