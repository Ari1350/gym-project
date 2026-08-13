const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

// GET /classes 
const getAllClasses = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('classes').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gym classes.' });
  }
};

// GET /classes/:id 
const getSingleClass = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid class ID format.' });
    }
    const classId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('classes').find({ _id: classId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Gym class not found.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the gym class.' });
  }
};

module.exports = {
  getAllClasses,
  getSingleClass
};

// POST /classes (Create a new gym class)
const createClass = async (req, res) => {
  try {
    const newClass = {
      name: req.body.name,
      trainer: req.body.trainer,
      schedule: req.body.schedule,
      capacity: parseInt(req.body.capacity),
      status: req.body.status || 'active'
    };

  
    if (!newClass.name || !newClass.trainer || !newClass.schedule || !newClass.capacity) {
      return res.status(400).json({ message: 'Missing required fields. Please fill all data.' });
    }

    const response = await mongodb.getDb().db('gym_project').collection('classes').insertOne(newClass);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Gym class created successfully.', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the class.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// PUT /classes/:id 
const updateClass = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid class ID format.' });
    }
    const classId = new ObjectId(req.params.id);
    const updatedClass = {
      name: req.body.name,
      trainer: req.body.trainer,
      schedule: req.body.schedule,
      capacity: parseInt(req.body.capacity),
      status: req.body.status
    };

    const response = await mongodb.getDb().db('gym_project').collection('classes').replaceOne({ _id: classId }, updatedClass);
    if (response.modifiedCount > 0) {
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: 'Gym class not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the gym class.' });
  }
};

// DELETE /classes/:id (Delete a gym class)
const deleteClass = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid class ID format.' });
    }
    const classId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gym_project').collection('classes').deleteOne({ _id: classId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Gym class deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Gym class not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the gym class.' });
  }
};

module.exports = {
  getAllClasses,
  getSingleClass,
  createClass,
  updateClass,
  deleteClass
};
