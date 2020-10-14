import { resolvers } from '../../src/graphql/modules/register/resolvers'
import { resolvers as resolversLogin } from '../../src/graphql/modules/login/resolvers'
import User from '../../src/models/User'

const { createUser } = resolvers
const { login } = resolversLogin

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
        it('Should return a token if correct login', async() => {
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

afterAll(async() => {
    await User.destroy({truncate: true, force: true})
})