import database from "../config/config.js";
import { DataTypes } from "sequelize";
 
const Categories = database.define('categories', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
            const value = this.getDataValue('name');
            return value ? value.toLowerCase(): null
        }
    }
}) 

Categories.sync({  }); 

export default Categories
