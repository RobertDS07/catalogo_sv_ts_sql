import { Op } from "sequelize"
import Product from "../../../models/Product"

import verifyData from "../../../utils/verifyData"
import verifyToken from "../../../utils/verifyToken"

interface getProducts {
    storeName: string
    offset: number
    limit: number
    search?: string
    sort?: string
    category?: string
}

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

interface updateProduct {
    storeName: string
    token: string
    id: number
    data: {
        fotourl?: string,
        name?: string,
        size?: string,
        category?: string,
        price?: number,
        description?: string
    }
}

interface deleteProduct {
    storeName: string
    token: string
    id: number
}

export const resolvers = {
    getProducts: async ({ storeName, offset, limit, search, sort, category }: getProducts) => {
        try {
            if (!!search) search = search.trim().toLocaleLowerCase()
            if (!!category) category = category.trim().toLocaleLowerCase()
            if (!category) {
                const { rows: products, count } = !sort ? !search ? await Product.findAndCountAll({ where: { storeName }, order: [['category', 'ASC']], offset, limit }) : await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { name: { [Op.like]: search } }] }, offset, limit, order: [['category', 'ASC']] }) : !search ? await Product.findAndCountAll({ where: { storeName }, offset, limit, order: [['price', sort]] }) : await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { name: { [Op.like]: search } }, { category }] }, offset, limit, order: [['price', sort]] })

                return { products, count }
            }
            const { rows: products, count } = !sort ? !search ? await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { category }] }, offset, limit, order: [['category', 'ASC']] }) : await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { category }, { name: { [Op.like]: search } }] }, offset, limit, order: [['category', 'ASC']] }) : !search ? await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { category }] }, offset, limit, order: [['price', sort]] }) : await Product.findAndCountAll({ where: { [Op.and]: [{ storeName }, { category }, { name: { [Op.like]: search } }, { category }] }, offset, limit, order: [['price', sort]] })

            return { products, count }
        } catch (e) {
            if (!!e) e = new Error('Ocorreu um erro, tente novamente, se persistire contate o dono do site.')
            return e
        }
    },
    createProduct: async ({ storeName, token, data }: createProduct) => {
        try {
            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Faça o login novamente.')

            //se retornar falso eu tiro o state admin true no front
            if (verifiedToken.user.storeName !== storeName) return false

            if (data.description === undefined || data.description.trim() === '' || data.description === null) delete data.description

            verifyData(data)

            const createdProduct = await Product.create({ storeName, ...data })

            if (!createdProduct) throw new Error('Houve algo errado no processo de cadastrar o produto, tente novamente, se persistir contate o dono do site.')

            return true
        } catch (e) {
            return e
        }
    },
    updateProduct: async ({ storeName, token, id, data }: updateProduct) => {
        try {
            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Faça o login novamente.')

            //se retornar falso eu tiro o state admin true no front
            if (verifiedToken.user.storeName !== storeName) return false

            if (!data) throw new Error('Por favor preencha pelo menos um campo.')

            const updatedProduct = await Product.update(data, { where: { [Op.and]: [{ id }, { storeName }] } })

            if (!updatedProduct) throw new Error('Houve algo errado no processo de cadastrar o produto, tente novamente, se persistir contate o dono do site.')

            return true
        } catch (e) {
            return e
        }
    },
    deleteProduct: async ({ storeName, token, id }: deleteProduct) => {
        try {
            const verifiedToken = await verifyToken(token)

            if (!verifiedToken) throw new Error('Faça o login novamente.')

            //se retornar falso eu tiro o state admin true no front
            if (verifiedToken.user.storeName !== storeName) return false

            const deletedProduct = await Product.destroy({ where: { [Op.and]: [{ id }, { storeName }] } })

            if (!deletedProduct) throw new Error('Houve algo errado no processo de deletar o produto, tente novamente, se persistir contate o dono do site.')

            return true
        } catch (e) {
            return e
        }
    }
}