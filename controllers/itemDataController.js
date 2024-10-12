// controllers/personalDataController.js
const ItemData = require('../models/ItemData');
const mongoose = require('mongoose')

//import objectId from mongoose to use for searching by id stored in collection as objectId
const ObjectId = mongoose.Types.ObjectId;

// Get all personal data items
const getAllItemData = async (req, res, next) => {
  try {
    const items = await ItemData.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// Create/post a new personal data item
const createItemData = async (req, res, next) => {
  try {
    const newItem = new ItemData(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};

// Update a personal data item. Will need to review this more
const updateItemData = async (req, res, next) => {
   try {
        const { id } = req.params; // Get ID from request parameters

        //convert id to objectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format'});
        }
        const updatedItem = await ItemData.findByIdAndUpdate(
            new ObjectId(id), //convert to objectId
            req.body, 
            { new: true }); // { new: true } returns the updated document
        if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        next(error);
    }
};
  
// Delete a personal data item. To review this.
const deleteItemData = async (req, res, next) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const deletedItem = await ItemData.findByIdAndDelete(id);
        if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
        }
        res.status(204).send(); // 204 No Content response
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllItemData, createItemData, updateItemData, deleteItemData };
