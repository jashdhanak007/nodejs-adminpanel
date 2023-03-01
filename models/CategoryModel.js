const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})

const category = mongoose.model('category', CategorySchema);
module.exports = category;
