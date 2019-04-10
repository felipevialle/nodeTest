/**
 * Module Dependencies
 */
const Router = require('restify-router').Router
const routerInstance = new  Router()

/**
 * Module Controllers
 */
const AlunoController = require('../controllers/AlunoController')


routerInstance.get('/alunos', AlunoController.findAll);
routerInstance.get('/alunos/:id', AlunoController.findById);
routerInstance.post('/alunos', AlunoController.create);
routerInstance.del('/alunos/:id', AlunoController.delete);
routerInstance.put('/alunos/:id', AlunoController.update);

module.exports = routerInstance