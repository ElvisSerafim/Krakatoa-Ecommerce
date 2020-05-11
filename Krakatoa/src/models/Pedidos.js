const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

    precoTotal: {
        type: Number,
        require: true,
    },

    frete: {
        type: Number,
        require: true,
    },

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    produtos: [
        {type: mongoose.Schema.Types.ObjectId ,ref:'Produto'}
    ]

}, { timestamps: true });
pedidoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
