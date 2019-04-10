const restify = require('restify');
const config = require('./config')
const mongoose = require('mongoose');
/**
 * Model Schema
 */
const Aluno = require('./model/Aluno')


/**
  * Inicializa o servidor
 */
const server = restify.createServer({
	name: config.name,
	version: config.version,
	ignoreTrailingSlash: true
})

server.listen(config.port, ()=> {
    console.log('API está escutando na porta 3000');

    /**
     * Inicializa conexão com o BD
     */
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.uri, { useNewUrlParser: true });

	const db = mongoose.connection

    db.on('error', (err) => {
	    console.error(err)
	    process.exit(1)
    });

    /**
     * Configurações iniciais
     */
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.fullResponse());

    server.get('/alunos', (req, resp, next)=>{

        Aluno.find({}, function (error, listaAlunos) {  
            if (listaAlunos.length > 0) {
                resp.json (listaAlunos);
            }  else {
                console.log('Formata saída de aluno');
                console.log(listaAlunos);
                resp.status(404);
                resp.json({message: 'Nenhum aluno encontrado'});
            }
        });

        return next();
    });
    
    server.get('/alunos/:_id', (req, resp, next)=>{

        const listaAlunos = Aluno.findById(req.params._id).then(aluno=>{
            if (aluno) {
                resp.status(200);
                resp.json(aluno);
            } else {
                console.log('Formata saída de aluno');
                resp.status(404);
                resp.json({message: 'Aluno não encontrado'});
            }
        }).catch(error => resp.send(500, error));

        return next();
    });

    /**
     * Inclusão de um aluno na base de dados.
     */
    server.post('/alunos', (req, resp, next)=>{

        const crypto = require('crypto');
        
        const UUIDGeneratorNode = () =>
           ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
             (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
           );

        let aluno = new Aluno({
            _id: UUIDGeneratorNode(),
            nome: req.body.nome,
            idade: req.body.idade
        });

        aluno.save().then(aluno=>{
            resp.json(aluno);
        }).catch(error => {
            resp.status(400);
            resp.json({message: 'Aluno não inserido'})
        });

        return next();
    });

    server.get('/teste', (req, resp, next)=>{
        console.log(req);
        ignoreTrailingSlash:true
        resp.json ({message: 'Funciona ?'})
    })
})
