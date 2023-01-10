

const {Schema,model} = require('mongoose')


const tripSchema = new Schema({
    start_date:{
        type:String,
        required:true
    },
    end_date:{
        type:String,
        required:true
    },
    category:String,
    no_of_adults:Number,
    no_of_kids:Number,
    start_location:{
        type:String,
        required:true
    },
    end_location:{
        type:String,
        required:true
    }
})

const tripModel = model('trip',tripSchema)

module.exports = tripModel;