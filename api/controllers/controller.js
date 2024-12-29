const axios = require('axios');
const path = require('path')

const express = require('express')
const Router = express.Router()
const User = require('../models/User.js')
const Place = require('../models/Place.js')
const bcrypt = require('bcrypt');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'evebetbetbe'
const jwt = require('jsonwebtoken')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')





Router.get('/test', (req,res)=> {
    res.json('test ok')
});

Router.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try{
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
   });
   res.json(userDoc);
}
   catch(err){
    res.status(422).json(err);
   }  
});

//L8OWHwCRvVy1Yewz
// Router.post('/login', async (req,res) =>{
//     const {email,password} =req.body;
//     const userDoc = await User.findOne({email});
//     if (userDoc){
//         res.json('found');
//         const passOk = bcrypt.compareSync(password, userDoc.password)
//         if (passOk){
//             jwt.sign({
//                 email:userDoc.email, 
//                 id:userDoc._id
//             },
//                 jwtSecret ,{},(err,token)=>{
//                     if (err) throw err;
//                     res.cookie('token', token).json(userDoc);
//                 })
            
//         } else{
//             res.json('pass not ok');
//         }
//     }else{
//         res.json('not found');
//     }
// });
Router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const userDoc = await User.findOne({ email });
    
    // If the user is not found, respond with an appropriate message
    if (!userDoc) {
        return res.status(404).json({ message: 'User not found' });
    }

    // If the user is found, compare the password
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // If the password is correct, sign the JWT and send the user data
    jwt.sign(
        {
            email: userDoc.email,
            id: userDoc._id
            
        },
        jwtSecret,
        {},
        (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
        }
    );
});


Router.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id})
        })
    }else{
        res.json(null)
    }
    
})

Router.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
})

// console.log({__dirname})
// Router.post('/upload-by-link',async (req,res)=>{
//     const {link} = req.body; 
//     const newName = 'photo'+Date.now()+'.jpg'
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname+'/uploads/'+newName
//     });
//     res.json(newName)
// })

// const saveImageToDatabase = async (link) => {
//     const newPhoto = new PhotoModel({ link });
//     await newPhoto.save();
    
//     return newPhoto._id; // Return the generated ID
// };

Router.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo'+ Date.now()+'.jpg';
    await imageDownloader.image({
        url: link,
        dest: 'E:/Projects/WebDevelopment/Project/airbnb-clone/api'+'/uploads/'+newName
    });
    
    res.json(newName);
//     try {
//         const response = await axios.get(link, { responseType: 'arraybuffer' });
//         const imgData = Buffer.from(response.data, 'binary');
//         const contentType = response.headers['content-type'];

//         const newPlace = new Place({
//             title: req.body.title,
//             photos: [{ data: imgData, contentType: contentType }],
//             // Add other fields as needed
//         });
        
//         await newPlace.save();

//         console.log('New photo ID:', newPlace.photos[0]._id); // Log the ID
//         res.json(newPlace.photos[0]._id);  // Return photo ID to the client
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Image upload failed' });
//     }
});

const photosMiddleware = multer({dest:'uploads/'})

Router.post('/upload',photosMiddleware.array('photos', 100), (req,res) =>{
    const uploadedFiles = [] 
    for (let i = 0; i<req.files.length; i++){
        const {path, originalname} = req.files[i];
        console.log(path, originalname)
        const parts = originalname.split('.');
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        // console.log(newPath)
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/',''))
    }
    res.json(uploadedFiles)

})




// Router.get('/photos/:id', async (req, res) => {
//     try {
//         const place = await Place.findOne({ 'photos._id': req.params.id });
//         if (!place) return res.status(404).send('Photo not found');

//         const photo = place.photos.id(req.params.id); // Use .id() to find the subdocument
//         if (!photo) return res.status(404).send('Photo not found');

//         res.contentType(photo.contentType);
//         res.send(photo.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving image');
//     }
// });
Router.post('/places', (req,res) => {
    const {token} = req.cookies; 
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body
    jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests

        })
        res.json(placeDoc)
    })
    
})


module.exports = Router
