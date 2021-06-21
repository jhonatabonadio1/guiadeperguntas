import { Sequelize } from "sequelize";

const connection = new Sequelize('guiaperguntas','root','admin',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

export default connection;