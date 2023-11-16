const config = require('config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing MedicalCenter Model
const MedicalCenter = require('../models/MedicalCenter');

exports.registerMedicalCenter = async (req,res) => {
    const errors = validationResult(req);
    console.log("Medical Center Register");

    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const { 
        name, owner_name,medical_center_registration_No, 
        owner_nic, district_id,address, 
        contact_No_Landline , contact_No_Mobile, 
        logoURL , 
        RegisterCertificateImageURL, 
        medicalCenterRating, password , business_email  } = req.body;
    
        let medicalCenter = await MedicalCenter.findOne({
            medical_center_registration_No : medical_center_registration_No
        });
        if(medicalCenter){
            res.status(400).json({ errors : [ {msg : "Medical Cneter Already registered in the System."} ]});
        }else {
            medicalCenter = new MedicalCenter({
                name, 
                owner_name,
                medical_center_registration_No, 
                owner_nic, 
                district_id,
                address, 
                contact_No_Landline , contact_No_Mobile, 
                logoURL , 
                RegisterCertificateImageURL, 
                medicalCenterRating,
                password, business_email
            });

            // Encrypt the Password of the User
            const salt = await bcrypt.genSalt(10);
           medicalCenter.password = await bcrypt.hash(password, salt);

            // Save the user in the database
            await medicalCenter.save();

            // Issuing jsonwebtoken to user 

            const payload = {
                medicalCenter: {
                    
                    name : medicalCenter.name,
                    owner_name : medicalCenter.owner_name,
                    medical_center_registration_No : medicalCenter.medical_center_registration_No, 
                    owner_nic : medicalCenter.owner_nic, 
                    district_id : medicalCenter.district_id
                    
                },
            };

            jwt.sign(
                payload,
                config.get("JWTSecret"),
                {
                    expiresIn: 86400,   // Expire the Token after 24 Hrs ( for Web App)
                },
                (error, token) => {
                    if (error) throw err;
                    res.json({ token });
                }
            );
        }


}

