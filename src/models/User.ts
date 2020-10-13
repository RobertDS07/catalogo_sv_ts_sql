import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../database'

interface User extends Model {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    email: string
    password: string
    isAdmin: boolean
}

const User = sequelize.define<User>('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 40]
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    hooks: {
        beforeCreate: async (User: User) => {
            User.password = await bcrypt.hash(User.password, 10)
        }
    }
})

export default User