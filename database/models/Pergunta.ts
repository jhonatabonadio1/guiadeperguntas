import { DataTypes } from 'sequelize'
import connection from '../database'

const Pergunta = connection.define('perguntas',{
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela PERGUNTAS criada.")
})

export default Pergunta