
const {Router} = require('express')
const tripModel = require('../models/trip')

const tripRoute = Router()

tripRoute.get('/',async(req,res)=>{
    try {
        const trip = await tripModel.find()
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

tripRoute.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const trip = await tripModel.findById({_id:id})
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

tripRoute.post('/',async(req,res)=>{
    try {
        const {start_date,end_date,category,no_of_adults,no_of_kids,start_location,end_location} = req.body;
        const trip = await tripModel.create({start_date,end_date,category,no_of_adults,no_of_kids,start_location,end_location})
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

tripRoute.put('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const {start_date,end_date,category,no_of_adults,no_of_kids,start_location,end_location} = req.body;
        const trip = await tripModel.updateOne({_id:id},{start_date,end_date,category,no_of_adults,no_of_kids,start_location,end_location})
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

tripRoute.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const trip = await tripModel.deleteOne({_id:id})
        res.status(200).json(trip)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = tripRoute;