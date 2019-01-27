const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


const leaderships = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    },
}, {
    timestamps: true
});

var Leaderships = mongoose.model('Leaderships', leaderships);

module.exports = Leaderships;