/**
 * Module Dependencies
 */
const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const AlunoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true
        },
        status: {
            type: String,
			required: true,
			enum: ['ACTIVE', 'INACTIVE'],
			default: 'ACTIVE',
        }
    },
    { minimize: false },
)

AlunoSchema.plugin(timestamps)
AlunoSchema.plugin(mongooseStringQuery)

module.exports = mongoose.model('Aluno', AlunoSchema)