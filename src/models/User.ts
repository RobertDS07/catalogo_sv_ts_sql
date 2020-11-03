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

const User = sequelize.define<User>(
    'users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Email inválido.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 40],
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        hooks: {
            beforeSave: async (user: User) => {
                const userSaved = user
                if (userSaved.storeName) userSaved.isAdmin = true
                userSaved.password = await bcrypt.hash(userSaved.password, 10)
            },
            beforeCreate: (user: User) => {
                const newUser = user
                newUser.email = newUser.email.trim()
            },
        },
    }
)

User.belongsTo(Store, { foreignKey: 'storeName' })
Store.hasMany(User, { foreignKey: 'storeName' })

export default User
