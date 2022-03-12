import database from "../config/config.js";
import { DataTypes } from "sequelize";
import Products from "./Products.js";
 
const Attribute = database.define('attribute', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        get() {
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const value = this.getDataValue('productId');
            return value ? value.toLowerCase(): null
        } 
    }
}) 

Attribute.sync({alter: true}); 
Attribute.belongsTo(Products, {
    foreignKey: 'productId',
    onDelete: 'cascade'
})

export default Attribute
