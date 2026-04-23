const AdminModel = require('../models/admin.model.js');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerAdmin = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { email, password, name } = req.body;

        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);

        const admin = new AdminModel({ email, password: hashed, name });
        await admin.save();

        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        next(error);
    }
};

const loginAdmin = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin does not exist" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: admin._id, name: admin.name, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const resAdmin = {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
        };

        return res.status(200).json({ message: "Logged In", admin: resAdmin, token });
    } catch (error) {
        next(error);
    }
};

module.exports = { loginAdmin, registerAdmin };