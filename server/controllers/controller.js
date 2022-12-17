const productSchema = require("../models/model");

//GETALL
exports.getAllProduct = async (req, res) => {
    try {
        const data = await productSchema.find();
        return res.status(200).json({
            message: "item fetched successfully. ",
            data: data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//ADD
exports.addProduct = async (req, res) => {
    try {
        const product = new productSchema(req.body);
        const savedData = await product.save();

        return res.status(200).json({
            message: "item added successfully. ",
            savedData: savedData,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//DELETE
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productSchema.findByIdAndDelete(id);
        return res.status(200).json({
            message: "item deleted successfully. ",
            data: data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//GETONE
exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productSchema.findById(id);
        return res.status(200).json({
            message: "One item fetched successfully. ",
            data: data,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//UPDATE
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const savedData = await productSchema.findByIdAndUpdate(id, updatedData);

        return res.status(200).json({
            message: "item updated successfully. ",
            data: savedData,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//SEARCH
exports.searchProduct =  async (req, res) => {
    const {title} = req.params;
    try {
        const data = await productSchema.find({ brand : { $regex :title, $options: "i" }});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

