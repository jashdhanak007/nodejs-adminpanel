const SubCategoryModel = require('../models/SubCategoryModel');
const CategoryModel = require('../models/CategoryModel')
const SubCategory = async (req, res) => {
    try {
        let categoryrec = await CategoryModel.find({});
        if (categoryrec) {
            console.log(categoryrec)
            return res.render('subcategory', {
                categorydata: categoryrec
            })
        } else {
            console.log("Record not fetch");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const insertsubcategory = async (req, res) => {
    try {
        const addsubcategory = await SubCategoryModel.create({
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory
        })
        if (addsubcategory) {
            console.log("Subcategory successfully add");
            return res.redirect('back');
        } else {
            console.log("Subcategory not successfully add");
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewsubcategory = (req, res) => {
    SubCategoryModel.find({}).populate("categoryId") // key to populate
        .then(user => {
            console.log(user);
            return res.render('viewsubcategory', {
                allrecord: user
            });
        });
}

module.exports = { SubCategory, insertsubcategory, viewsubcategory }