/**
 * Dependências
 */
const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')

const AlunoSchema = new mongoose.Schema(
    {
        _id:  { 
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        idade: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: false,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
        }
    },
    { minimize: false }
);

AlunoSchema.plugin(mongooseStringQuery)
module.exports = mongoose.model('Aluno', AlunoSchema)