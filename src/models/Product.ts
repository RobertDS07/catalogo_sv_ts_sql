import { Model, DataTypes } from 'sequelize'
import sequelize from '../database'
import Store from './Store'

interface Product extends Model {
    id: number
    storeName: string
    fotourl: string
    name: string
    price: number
    size: string
    category: string
    description?: string
}

const Product = sequelize.define<Product>('products', {
    fotourl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val: string) {
            this.setDataValue('name', val.trim().toLowerCase())
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val: string) {
            this.setDataValue('size', val.trim().toLowerCase())
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val: string) {
            this.setDataValue('category', val.trim().toLowerCase())
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Product.belongsTo(Store, { foreignKey: 'storeName'})
Store.hasMany(Product, { foreignKey: 'storeName'})

export default Product