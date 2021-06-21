import express from 'express'
import connection from './database/database'
import Pergunta from './database/models/Pergunta'
import Resposta from './database/models/Resposta'


connection
.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados bem sucedida')
})
.catch((err: string) => {
    console.log(err)
})

const app = express();

app.use(express.static('public'))
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true ,order:[['id', 'DESC']]}).then(perguntas => {
        return res.render('index', {
            perguntas: perguntas
        })
    })
})
app.get("/perguntar", (req, res) => {
    return res.render('perguntar')
})
app.post("/salvarpergunta", (req, res) => {
    const {titulo} = req.body
    const {descricao} = req.body
    Pergunta.create({
        titulo,
        descricao
    }).then(() => {
        return res.redirect("/")
    })
})

app.get("/pergunta/:id", (req, res) => {
    const {id} = req.params
    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: id},
                raw: true, 
                order:[['id', 'DESC']]})
                .then(respostas => {
                    return res.render("pergunta", {
                        pergunta,
                        respostas
                    })
            })
        }else{
            return res.redirect('/')
        }
    })
})

app.post("/resposta/:id", (req, res) => {
    const {id} = req.params
    const {corpo} = req.body

    Resposta.create({
        corpo,
        perguntaId: id
    }).then(() => {
        return res.redirect(`/pergunta/${id}`)
    })

})

app.listen(8181, () =>{
    console.log("Servidor iniciado")
})