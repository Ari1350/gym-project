const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

// GET /trainers (Get all trainers)
const getAllTrainers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('gym_project').collection('trainers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trainers.' });
  }
};

// GET /trainers/:id (Get single trainer by ID)
const getSingleTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trainer ID format.' });
    }
    const trainerId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('gym_project').collection('trainers').find({ _id: trainerId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Trainer not found.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the trainer.' });
  }
};

// POST /trainers (Create a new trainer)
const createTrainer = async (req, res) => {
  try {
    const newTrainer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialty: req.body.specialty, 
      phone: req.body.phone,
      status: req.body.status || 'active'
    };

    const response = await mongodb.getDb().db('gym_project').collection('trainers').insertOne(newTrainer);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Trainer created successfully.', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the trainer.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// PUT /trainers/:id 
const updateTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trainer ID format.' });
    }
    const trainerId = new ObjectId(req.params.id);
    const updatedTrainer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialty: req.body.specialty,
      phone: req.body.phone,
      status: req.body.status
    };

    const response = await mongodb.getDb().db('gym_project').collection('trainers').replaceOne({ _id: trainerId }, updatedTrainer);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Trainer not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the trainer.' });
  }
};

// DELETE /trainers/:id 
const deleteTrainer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trainer ID format.' });
    }
    const trainerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gym_project').collection('trainers').deleteOne({ _id: trainerId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Trainer deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Trainer not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the trainer.' });
  }
};

module.exports = {
  getAllTrainers,
  getSingleTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer
};
