import database from "../config/config.js";
import { DataTypes } from "sequelize";
import Attribute from './Attribute.js'
 
const AttributeValue = database.define('attributeValue', {
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
    attributeId: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const value = this.getDataValue('attributeId');
            return value ? value.toLowerCase(): null
        }
    }
}) 

AttributeValue.sync({alter: true}); 

AttributeValue.belongsTo(Attribute, {
    onDelete: 'cascade',
    foreignKey: 'attributeId'
})

export default AttributeValue
