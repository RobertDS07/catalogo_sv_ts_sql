import Product from "../../../models/Product"

import verifyData from "../../../utils/verifyData"
import verifyToken from "../../../utils/verifyToken"

interface createProduct {
    storeName: string
    token: string
    data: {
        fotourl: string,
        name: string,
        size: string,
        category: string,
        price: number,
        description?: string
    }
}

export const resolvers = {
    createProduct: async ({ storeName, token, data }: createProduct) => {
        try {
            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Faça o login novamente.')

            //se retornar falso eu tiro o state admin true no front
            if (verifiedToken.user.storeName !== storeName) return false

            if (data.description === undefined || data.description.trim() === '' || data.description === null) delete data.description

            verifyData(data)

            const createdProduct = await Product.create({storeName, data})

            if(!createdProduct) throw new Error('Houve algo errado no processo de cadastrar o produto, tente novamente, se persistir contate o dono do site.')

            return true
        } catch (e) {
            return e
        }
    }
}