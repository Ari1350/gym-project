const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

// GET /equipment (Get all gym equipment)
const getAllEquipment = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('gym_project').collection('equipment').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gym equipment.' });
  }
};

// GET /equipment/:id (Get single equipment item by ID)
const getSingleEquipment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid equipment ID format.' });
    }
    const equipmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('gym_project').collection('equipment').find({ _id: equipmentId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Equipment item not found.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the equipment item.' });
  }
};

// POST /equipment (Create a new equipment item)
const createEquipment = async (req, res) => {
  try {
    const newEquipment = {
      itemName: req.body.itemName, 
      area: req.body.area,         
      quantity: parseInt(req.body.quantity),
      condition: req.body.condition || 'good', 
      status: req.body.status || 'active'
    };

    const response = await mongodb.getDb().db('gym_project').collection('equipment').insertOne(newEquipment);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Equipment item created successfully.', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the equipment item.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// PUT /equipment/:id (Update an equipment item)
const updateEquipment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid equipment ID format.' });
    }
    const equipmentId = new ObjectId(req.params.id);
    const updatedEquipment = {
      itemName: req.body.itemName,
      area: req.body.area,
      quantity: parseInt(req.body.quantity),
      condition: req.body.condition,
      status: req.body.status
    };

    const response = await mongodb.getDb().db('gym_project').collection('equipment').replaceOne({ _id: equipmentId }, updatedEquipment);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Equipment item not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the equipment item.' });
  }
};

// DELETE /equipment/:id (Delete an equipment item)
const deleteEquipment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid equipment ID format.' });
    }
    const equipmentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gym_project').collection('equipment').deleteOne({ _id: equipmentId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Equipment item deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Equipment item not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the equipment item.' });
  }
};

module.exports = {
  getAllEquipment,
  getSingleEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
};
