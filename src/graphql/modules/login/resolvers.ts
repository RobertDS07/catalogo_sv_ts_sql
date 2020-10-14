import bcrypt from 'bcryptjs'

import User from "../../../models/User"
import createToken from '../../../utils/createToken'
import verifyData from "../../../utils/verifyData"

interface login {
    data: {
        email: string
        password: string
    }
}

export const resolvers = {
    login: async ({ data }: login) => {
        try{
            verifyData(data)

            const user = await User.findOne({where: {email: data.email}})

            if(!user || !await bcrypt.compare(data.password, user.password)) throw new Error('Credenciais inválidas.')

            const toGenerateToken = {
                id: user.id,
                admin: user.isAdmin
            }

            const token = createToken(toGenerateToken)

            return token
        } catch(e) {
            return e
        }
    }
}