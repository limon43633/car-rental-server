import path from "path";
import imageKit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from 'fs';
import Car from "../models/Car.js";

// Api to change role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list your cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Api to list car

export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimization through imageKit URL transformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation : [
                {width: '1280'}, // width resizing
                {quality: 'auto'}, // Auto compression
                { format: 'webp' } // Convert to modern format
            ]
        });


        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image})

        res.json({success: true, message: "Car Added"})


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

