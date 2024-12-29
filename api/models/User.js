const mongoose = require('mongoose');
/*const {Schema} = mongoose;*/

const UserSchema = new mongoose.Schema
({
    name: 
    {   
        type:String,
    },
    email: 
    {
            type:String ,
            unique:true,
    },
    password: 
    {
        type:String
    }
});

const UserModel = mongoose.model('User',UserSchema);

module.exports= UserModel;


/*const mongoose = require('mongoose')


const alienSchema = new mongoose.Schema
({

    name: 
    {
        type: String,
        required: true
    },
    rollno: 
    {
        type: Number,
        required: true
    },
    dept: 
   {
        type: String,
        required: true,
        
    },
    exam_status:
    {
        type: Boolean,
        required: true,
        default: false
    },
    cgpa:
    {
        type: Number,
        required: true
    }

    

})

module.exports = mongoose.model('class',alienSchema)*/
