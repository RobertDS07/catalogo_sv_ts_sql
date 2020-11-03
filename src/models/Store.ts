import { DataTypes, Model } from 'sequelize'
import sequelize from '../database'

interface store extends Model {
    storeNameToLink: string
    createdAt: Date
    updatedAt: Date
    logoLink: string
    instaLink: string
    insta: string
    whats: string
    whatsLinkToMsg: string
}

const Store = sequelize.define<store>('stores', {
    storeNameToLink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            is: {
                args: '^[a-zA-Z0-9_]+$',
                msg: 'Nome deve ser sem espaços!',
            },
        },
    },
    logoLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instaLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    insta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    whats: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    whatsLinkToMsg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default Store
