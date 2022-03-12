import database from "../config/config.js";
import  Sequelize  from "sequelize";
import { DataTypes, Model } from "sequelize";
import Categories from "./Categories.js";

const Products = database.define('products', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        get() {
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    },
    image: {
        type: DataTypes.STRING(400),
        get() {
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    },
    discription: {
        type: DataTypes.STRING(300),
        get() {
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    },
    material: {
        type: DataTypes.STRING(40),
        get() {  
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    }
}) 

Products.belongsTo(Categories,  {
    onDelete: 'cascade',
    foreignKey: 'categoryId',
    as: 'Current',
    constraints: false
})



Products.sync({}); 

export default Products
