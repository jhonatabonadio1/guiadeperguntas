import { DataTypes } from "sequelize";
import connection from "../database";

const Resposta = connection.define("respostas", {
  corpo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  perguntaId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

Resposta.sync({force: false}).then(() => {
  console.log("Tabela RESPOSTAS Criada")
})

export default Resposta