import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../database'
import Store from './Store'

interface User extends Model {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    email: string
    password: string
    isAdmin: boolean
    storeName?: string
    store?: {
        storeNameToLink: string
    }
}

const User = sequelize.define<User>('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email inválido.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 40]
        },
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    hooks: {
        beforeSave: async (User: User) => {
            if(!!User.storeName) User.isAdmin = true
            User.password = await bcrypt.hash(User.password, 10)
        },
        beforeCreate: (User: User) => {
            User.email = User.email.trim()
        }
    }
})

User.belongsTo(Store)
Store.hasMany(User)

export default User