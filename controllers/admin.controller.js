const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const registerAdmin = async (req, res, next) => {
    const registerAdminSchema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
    const { error } = registerAdminSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    try {
        const { name, email, password } = req.body; 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);
        
        const admin = new User({ name, email, password: hashed, role: 'admin' });
        await admin.save();
        return res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports =  registerAdmin;