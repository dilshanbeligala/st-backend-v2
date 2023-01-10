

const {Router} = require('express')
const shopOwnerModel = require('../models/shop-owner')
const jwt = require('jsonwebtoken')

const shopOwnerRouter = Router()

shopOwnerRouter.get('/',async(req,res)=>{
    try {
        const shopOwner = await shopOwnerModel.find()
        res.status(200).json(shopOwner)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

shopOwnerRouter.post('/register',async(req,res)=>{
    try {
        const {shop_name,owner_name,email,license,address,phone_number,equipments,category,password} = req.body;
        const shopOwner = await shopOwnerModel.create({shop_name,owner_name,email,license,address,phone_number,equipments,category,password})
        const tkn = jwt.sign({shopOwner},'jwt-secret',{expiresIn:'1h'})
        res.cookie('token',tkn)
        res.status(200).json(shopOwner)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

shopOwnerRouter.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const shopOwner = await shopOwnerModel.login(email,password)
        const tkn = jwt.sign({shopOwner},'jwt-secret',{expiresIn:'1h'})
        res.cookie('token',tkn)
        res.status(200).json(shopOwner)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

shopOwnerRouter.get('/logout',async(req,res)=>{
    try {
        res.cookie('token','',{maxAge:0})
        res.sendStatus(202)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = shopOwnerRouter;

