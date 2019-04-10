const alunoRouter = require('../routers/aluno.router')

module.exports = function(server) {

    alunoRouter.applyRoutes(server)

}