import { resolvers } from '../../src/graphql/modules/users/resolvers'
import { resolvers as storeResolvers } from '../../src/graphql/modules/stores/resolvers'
import Store from '../../src/models/Store'
import User from '../../src/models/User'

const { createUser, login } = resolvers
const { storeNamesToLink, storeInfo } = storeResolvers

describe('Stores', () => {
    it('Should create a store', async () => {
        const store1 = await Store.create({storeNameToLink: 'loja1', logoLink:'logo', instaLink: 'instalink', insta: 'insta', whats: 'whats', whatsLinkToMsg: 'whatsLink'})
        const store2 = await Store.create({storeNameToLink: 'loja2', logoLink:'logo2', instaLink: 'instalink2', insta: 'insta2', whats: 'whats2', whatsLinkToMsg: 'whatsLink2'})

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
        expect(await storeInfo('loja1')).toStrictEqual(Error('Algo inesperado ocorreu por favore tente novamente, se o erro persistir conatate o dono do site.'))
    })
})

describe('Admin', () => {
    it('Should create a admin for a store', () => {

    })
    it('Should do a login and return a token, the token must contain storeNameToLink, isAdmin and id', () => {

    })
    it('Should send storeNameToLink and token, if token pass in first verify AND contains the isAdmin and storeNameToLink(token) it will verify if the storeNameToLink of request matches with the same of the token, this test will return true', () => {

    })
    it('Should do the same of the last test, but will throw a error beacause the user arent admin of this store', () => {

    })
    it('Should create a product, the request must contain token and obviously data of product', () => {

    })
    it('Should return a error if the token is invalid', () => {

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

afterAll(async () => {
    await User.destroy({ truncate: true, force: true })
    await Store.destroy({ truncate: true, force: true })
})