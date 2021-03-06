const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../Models/Products');
const User = require('../Models/User')

//GET All products
router.get('/', (req,res,next) => {
    Product.find()
    .sort({ _id: -1})
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            products: docs
        };
        res.set("X-Total-Count", docs.length).status(200).json(response);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//GET One Product
router.get('/:productId', (req,res,next) => {
    const _id = req.params.productId;
    Product.findById(_id)
    .select('_id name desc borrow price comments status buyer_id seller_id')
    .exec()
    .then((doc) => {
        console.log('From Database', doc);
        if(doc) {
            res.status(200).json({
                product: doc
            });
        } else{
            res.status(404).json({
                message: "No Valid Entry for the given ID"
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//PATCH Product for posting
router.patch('/',(req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        borrow: req.body.borrow,
        price: req.body.price,
        comments: req.body.comments,
        status: req.body.status,
        buyer_id: req.body.buyer_id,
        seller_id: req.body.seller_id
    });
    const seller_id = req.body.seller_id;
    console.log(seller_id,'seller id')
    User.findById(seller_id)
    .then( doc => {
        const updateOps = {}
        doc.products.push(updateOps[product] = product)
        doc.save()
        .then((result) => {
                res.status(200).json({
                message: 'Product Updated',
                result: result
        })
        .catch(err => {
            console.log('error in patch' +err);
            res.status(500).json(err);
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
                error: err
            });
        });
    });
    product.save()
    .then((result) => {
        res.status(201).json({
            addedProduct: {
                name: result.name,
                desc: result.desc,
                _id: result._id
            }
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//PATCH Product
router.patch('/:productId',(req,res,next) => {
    const _id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        console.log(ops.propName, ops.value);
    }
    Product.update({ _id },{ $set: updateOps })
    .exec()
    .then((result) => {
        res.status(200).json({
            message: 'Product Updated'
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//DELETE Product
router.delete('/:productId',(req,res,next) => {
    const _id = req.params.productId;
    Product.remove({ _id })
    .exec()
    .then((result) => {
        res.status(200).json({
            message: 'Product Deleted'
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;