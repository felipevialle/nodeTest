/**
 * Model Schema
 */
const Aluno = require('../models/Aluno')


module.exports = {

    /**
	 * LIST
	 */
    findAll(req, res, next) {
        Aluno.find({}).sort('name')
            .then(alunos => res.json(alunos))
            .catch(error => res.send(500, error))

            next()
    },

    /**
	 * GET
	 */
    findById(req, res, next) {
        Aluno.findById(req.params.id)
            .then(aluno => {
                if(aluno) res.json(aluno)
                else {
                    res.status(404)
                    res.json({message: 'Resource not found'})
                }
            })
            .catch(error => res.send(500, error))

            next()  
    },

    /**
	 * POST
	 */
    create(req, res, next) {
        Aluno.create(req.body)
            .then(aluno => {
                res.status(201)
                res.json(aluno)
            })
            .catch(error => res.send(500, error))

            next()  
    },


    /**
	 * UPDATE
	 */
    async update(req, res, next) {
        if(req.params.id) {
            const aluno = await Aluno.findById(req.params.id)
            if(!aluno) {
                res.json({message: 'Resource not found'})
            } else {
                Aluno.findOneAndUpdate(req.params.id, {...req.body}, {new: true})
                .then( aluno => res.send(aluno))
                .catch(error => res.send(500, error))
        
            }
        } else {
            res.send(400, {message: 'Parameter id is required'})
        }
        next()
    },
    

    /**
	 * DELETE
	 */
    async delete(req, res, next) {
        if(req.params.id) {
            const aluno = await Aluno.findById(req.params.id)
            if(!aluno) {
                res.json({message: 'Resource not found'})
            } else {
                Aluno.findOneAndDelete(req.params.id )
                .then(_ => res.send(204))
                .catch(error => res.send(500, error))
        
            }
        } else {
            res.send(400, {message: 'Parameter id is required'})
        }
        next()
    }
    
}