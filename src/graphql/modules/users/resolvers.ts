import bcrypt from 'bcryptjs'

import User from '../../../models/User'

import createToken from '../../../utils/createToken'
import verifyToken from '../../../utils/verifyToken'
import verifyData from '../../../utils/verifyData'

interface login {
    data: {
        email: string
        password: string
    }
}

interface createUser {
    data: {
        name: string
        email: string
        password: string
    }
}

interface createAdmin {
    auth: string
    data: {
        name: string
        email: string
        password: string
        storeName: string
    }
}

interface verifyToken {
    storeName?: string
    token: string
}

const resolvers = {
    createUser: async ({ data }: createUser) => {
        try {
            verifyData<typeof data>(data)

            if (data.password.length < 5)
                throw new Error('Senha deve conter 5 caracteres.')

            const [user, created] = await User.findOrCreate({
                where: { email: data.email },
                defaults: { password: data.password, name: data.name },
            })

            if (!created) throw new Error('Este email já esta em uso.')

            const toGenerateToken = {
                id: user.id,
                admin: user.isAdmin,
            }

            const token = createToken(toGenerateToken)

            return token
        } catch (e) {
            return e
        }
    },
    login: async ({ data }: login) => {
        try {
            verifyData(data)

            const user = await User.findOne({ where: { email: data.email } })

            if (!user || !(await bcrypt.compare(data.password, user.password)))
                throw new Error('Credenciais inválidas.')

            const toGenerateToken = {
                id: user.id,
                admin: user.isAdmin,
                storeName: user.storeName,
            }

            const token = createToken(toGenerateToken)

            return token
        } catch (e) {
            return e
        }
    },
    verifyToken: async ({ storeName, token }: verifyToken) => {
        const verifiedToken = await verifyToken(token)

        if (!verifiedToken) return false

        verifiedToken.user.storeName === storeName
            ? (verifiedToken.user.admin = true)
            : (verifiedToken.user.admin = false)

        return verifiedToken.user
    },
    createAdmin: async ({ data, auth }: createAdmin) => {
        try {
            if (auth !== process.env.CREATE_AUTH) return false

            const created = User.create({ ...data })

            if (!created) throw new Error('Houve algo errado ao criar')

            return true
        } catch (e) {
            return e
        }
    },
}

export default resolvers
