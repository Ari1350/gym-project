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
