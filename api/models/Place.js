const mongoose = require('mongoose')
const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos: [{ _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, data: Buffer, contentType: String }], // Array of binary images
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number
});



const PlaceModel = mongoose.model('Place',placeSchema)
module.exports = PlaceModel;


