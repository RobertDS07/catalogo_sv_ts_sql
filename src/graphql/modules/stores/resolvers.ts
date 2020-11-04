import Store from '../../../models/Store'

interface storeInfo {
    storeName: string
}

interface createStore {
    auth: string
    data: {
        storeNameToLink: string
        logoLink: string
        instaLink: string
        insta: string
        whats: string
        whatsLinkToMsg: string
    }
}

const resolvers = {
    storeNamesToLink: async () => {
        const allStoreNamesToLink = await Store.findAll({
            attributes: ['storeNameToLink'],
        })

        return allStoreNamesToLink
    },
    storeInfo: async ({ storeName }: storeInfo) => {
        try {
            const storeInfo = await Store.findOne({
                where: { storeNameToLink: storeName },
            })

            if (!storeInfo) throw new Error()

            return storeInfo
        } catch (e) {
            if (e)
                e = new Error(
                    'Algo inesperado ocorreu por favore tente novamente, se o erro persistir conatate o dono do site.'
                )
            return e
        }
    },
    createStore: async ({ data, auth }: createStore) => {
        try {
            if (auth !== process.env.CREATE_AUTH) return false

            const created = Store.create({ ...data })

            if (!created) throw new Error('Houve algo errado ao criar')

            return true
        } catch (e) {
            return e
        }
    },
}

export default resolvers
