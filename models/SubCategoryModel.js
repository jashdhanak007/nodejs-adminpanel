const mongoose = require('mongoose');

const SubcategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategory : {
        type : String,
        required : true
    }
});

const subcategory = mongoose.model('subcategory',SubcategorySchema);

module.exports = subcategory;   