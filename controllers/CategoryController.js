const CategoryModel = require('../models/CategoryModel')

const AddCategory = (req, res) => {
    return res.render('category')
}

const insertcategory = async (req, res) => {
    try {
        let insertcategory = await CategoryModel.create({
            category: req.body.category
        })
        if (insertcategory) {
            console.log("Category Added");
            return res.redirect('category')
        }else{
            console.log("Category Not inserted");
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

const viewcategory = async(req,res)=>{
    try {
        let categoryview = await CategoryModel.find({});
        if(categoryview){
            return res.render('viewcategory',{
                allcategorydata : categoryview
            })
        }else{
            console.log("Data not fetch");
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddCategory, insertcategory ,viewcategory}