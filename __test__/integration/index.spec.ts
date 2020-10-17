import { resolvers } from '../../src/graphql/modules/users/resolvers'
import { resolvers as storeResolvers } from '../../src/graphql/modules/stores/resolvers'
import { resolvers as productsResolvers } from '../../src/graphql/modules/products/resolvers'

import sequelize from '../../src/database'

import Store from '../../src/models/Store'
import User from '../../src/models/User'

const { createUser, login, verifyToken } = resolvers
const { storeNamesToLink, storeInfo } = storeResolvers
const { createProduct } = productsResolvers

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

describe('Stores', () => {
    it('Should create a store', async () => {
        const store1 = await Store.create({ storeNameToLink: 'loja1', logoLink: 'logo', instaLink: 'instalink', insta: 'insta', whats: 'whats', whatsLinkToMsg: 'whatsLink' })
        const store2 = await Store.create({ storeNameToLink: 'loja2', logoLink: 'logo2', instaLink: 'instalink2', insta: 'insta2', whats: 'whats2', whatsLinkToMsg: 'whatsLink2' })

        expect(store1).toHaveProperty('storeNameToLink')
        expect(store2).toHaveProperty('storeNameToLink')
    })
    it('Should return all storeNameToLink avaiable on db', async () => {
        expect(await storeNamesToLink()).toHaveLength(2)
    })
    it('Should return all data of one store that i define with storeNameToLink', async () => {
        expect(await storeInfo('loja1')).toHaveProperty('storeNameToLink', 'loja1')
    })
    it('Should return a error, only to test ;)', async () => {
        expect(await storeInfo('loja11')).toStrictEqual(Error('Algo inesperado ocorreu por favore tente novamente, se o erro persistir conatate o dono do site.'))
    })
})

describe('Admin', () => {
    it('Should create two admin', async () => {
        const userAdmin = await User.create({ storeName: 'loja1', name: 'robert', email: 'roberta@gmail.com', password: 'oiasdas' })
        const userAdmin2 = await User.create({ storeName: 'loja2', name: 'robert2', email: 'roberta2@gmail.com', password: 'oiasdas' })


        expect(userAdmin).toHaveProperty('storeName')
        expect(userAdmin2).toHaveProperty('storeName')
    })
    it('Should do a login and return a token, the token must contain storeName, isAdmin and id', async () => {
        const data = {
            data: {
                email: 'roberta@gmail.com',
                password: 'oiasdas',
            }
        }

        expect(await login(data)).toHaveProperty('token')
    })
    it('Should send storeName and token, if token pass in first verify AND contains the isAdmin and storeNameToLink(token) it will verify if the storeNameToLink of request matches with the same of the token, this test will return true', async () => {
        const storeName = 'loja1'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhZG1pbiI6dHJ1ZSwic3RvcmVOYW1lIjoibG9qYTEifSwiaWF0IjoxNjAyOTUyMDIzLCJleHAiOjE2MzQ0ODgwMjN9.PRTCR9EnPmrmgvT_1bBntXHxN9EQ5v8R5l2tz0NW2e8'

        expect(await verifyToken({ storeName, token })).toHaveProperty('user.admin', true)
    })
    it('Should do the same of the last test, but will throw a error beacause the user arent admin of this store', async () => {
        const storeName = 'loja1'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJhZG1pbiI6dHJ1ZSwic3RvcmVOYW1lIjoibG9qYTIifSwiaWF0IjoxNjAyOTU0MTU2LCJleHAiOjE2MzQ0OTAxNTZ9.3-Sn41E_vmOuJLhZA_xN-k9-mOjQ2GO7x9GJldin2pE'

        expect(await verifyToken({ storeName, token })).toHaveProperty('user.admin', false)
    })
    it('Should create a product, the request must contain storeName, token and obviously data of product', async () => {
        const storeName = 'loja1'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJhZG1pbiI6dHJ1ZSwic3RvcmVOYW1lIjoibG9qYTEifSwiaWF0IjoxNjAyOTUyMDIzLCJleHAiOjE2MzQ0ODgwMjN9.PRTCR9EnPmrmgvT_1bBntXHxN9EQ5v8R5l2tz0NW2e8'
        const data = {
            name: 'name',
            category: 'category',
            size: 'size',
            price: 3,
            fotourl: 'fotourl'
        }

        expect(await createProduct({ storeName, token, data })).toBeTruthy()
    })
    it('Should update a product', async () => {

    })
    it('Should delete a product', async () => {

    })
    it('Should create a lot of products for others tests', async () => {

    })
    it('Should return a error if the token is invalid (this test is very very for security, hardest with it)', async () => {
        const storeName = 'loja1'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJhZG1pbiI6dHJ1ZSwic3RvcmVOYW1lIjoibG9qYTIifSwiaWF0IjoxNjAyOTU0MTU2LCJleHAiOjE2MzQ0OTAxNTZ9.3-Sn41E_vmOuJLhZA_xN-k9-mOjQ2GO7x9GJldin2pE'
        const data = {
            name: 'name',
            category: 'category',
            size: 'size',
            price: 3,
            fotourl: 'fotourl'
        }

        expect(await createProduct({ storeName, token, data })).toBeFalsy()
    })
})

describe('Products', () => {
    it('Should return products of a specified store', () => {

    })
    it('Should return the same products but sorted', () => {

    })
    it('Should return products with pagination, the first 10 products and after more 10', () => {

    })
    it('Should return a product with i search', () => {

    })
})

describe('Users', () => {
    describe('Register', () => {
        it('Should create a user and return a token', async () => {
            const data = {
                data: {
                    email: 'robert@gmail.com',
                    password: '1233456',
                    name: 'robert'
                }
            }

            expect(await createUser(data)).toHaveProperty('token')
        })
        it('Should return a error if password length < 5', async () => {
            const data = {
                data: {
                    email: 'robert@gmail.com',
                    password: '123',
                    name: 'robert'
                }
            }

            expect(await createUser(data)).toStrictEqual(Error('Senha deve conter 5 caracteres.'))
        })
        it('Should return a error if alredy exist a user with same email', async () => {
            const data = {
                data: {
                    email: 'robert@gmail.com',
                    password: '1234455',
                    name: 'robert'
                }
            }

            expect(await createUser(data)).toStrictEqual(Error('Este email já esta em uso.'))
        })
    })

    describe('Login', () => {
        it('Should return a error if bad credentials', async () => {
            const data = {
                data: {
                    email: 'robert@gmail.com',
                    password: '12334a56',
                }
            }
            expect(await login(data)).toStrictEqual(Error('Credenciais inválidas.'))
        })
        it('Should return a token if correct login', async () => {
            const data = {
                data: {
                    email: 'robert@gmail.com',
                    password: '1233456',
                }
            }
            expect(await login(data)).toHaveProperty('token')
        })
    })
})