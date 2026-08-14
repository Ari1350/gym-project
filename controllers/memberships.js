const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

// GET /memberships (Get all members)
const getAllMembers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('gym_project').collection('memberships').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gym memberships.' });
  }
};

// GET /memberships/:id (Get single member by ID)
const getSingleMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid membership ID format.' });
    }
    const memberId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('gym_project').collection('memberships').find({ _id: memberId });
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        return res.status(404).json({ message: 'Gym membership not found.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the gym membership.' });
  }
};

// POST /memberships (Create a new member)
const createMember = async (req, res) => {
  try {
    const newMember = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,         
      birthDate: req.body.birthDate, 
      planType: req.body.planType,   
      status: req.body.status || 'active' 
    };

    if (!newMember.firstName || !newMember.lastName || !newMember.email || !newMember.phone || !newMember.birthDate || !newMember.planType) {
      return res.status(400).json({ message: 'Missing required fields. Please fill all data.' });
    }

    const response = await mongodb.getDb().db('gym_project').collection('memberships').insertOne(newMember);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Gym membership created successfully.', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the membership.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// PUT /memberships/:id (Update a member)
const updateMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid membership ID format.' });
    }
    const memberId = new ObjectId(req.params.id);
    const updatedMember = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      planType: req.body.planType,
      status: req.body.status
    };

    const response = await mongodb.getDb().db('gym_project').collection('memberships').replaceOne({ _id: memberId }, updatedMember);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Gym membership not found or no changes made.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating the gym membership.' });
  }
};

// DELETE /memberships/:id (Delete a member)
const deleteMember = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid membership ID format.' });
    }
    const memberId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gym_project').collection('memberships').deleteOne({ _id: memberId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Gym membership deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Gym membership not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the gym membership.' });
  }
};

module.exports = {
  getAllMembers,
  getSingleMember,
  createMember,
  updateMember,
  deleteMember
};
