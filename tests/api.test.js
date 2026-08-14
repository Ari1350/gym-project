const request = require('supertest');
const express = require('express');

// 1. Force mock ALL middlewares and controllers BEFORE importing the router
jest.mock('../middleware/isAuthenticated', () => (req, res, next) => next());
jest.mock('../middleware/validate', () => ({
  classValidationRules: () => [],
  membershipValidationRules: () => [],
  trainerValidationRules: () => [],
  equipmentValidationRules: () => [],
  validate: (req, res, next) => next()
}));

jest.mock('../controllers/classes', () => ({
  getAllClasses: (req, res) => res.status(200).json([{ name: "Yoga" }]),
  getSingleClass: (req, res) => res.status(200).json({ name: "Yoga" }),
  createClass: (req, res) => res.status(201).json({ message: "Created" }),
  updateClass: (req, res) => res.status(204).send(),
  deleteClass: (req, res) => res.status(200).json({ message: "Deleted" })
}));

jest.mock('../controllers/memberships', () => ({
  getAllMembers: (req, res) => res.status(200).json([{ firstName: "John" }]),
  getSingleMember: (req, res) => res.status(200).json({ firstName: "John" }),
  createMember: (req, res) => res.status(201).json({ message: "Created" }),
  updateMember: (req, res) => res.status(204).send(),
  deleteMember: (req, res) => res.status(200).json({ message: "Deleted" })
}));

jest.mock('../controllers/trainers', () => ({
  getAllTrainers: (req, res) => res.status(200).json([{ firstName: "David" }]),
  getSingleTrainer: (req, res) => res.status(200).json({ firstName: "David" }),
  createTrainer: (req, res) => res.status(201).json({ message: "Created" }),
  updateTrainer: (req, res) => res.status(204).send(),
  deleteTrainer: (req, res) => res.status(200).json({ message: "Deleted" })
}));

jest.mock('../controllers/equipment', () => ({
  getAllEquipment: (req, res) => res.status(200).json([{ itemName: "Treadmill" }]),
  getSingleEquipment: (req, res) => res.status(200).json({ itemName: "Treadmill" }),
  createEquipment: (req, res) => res.status(201).json({ message: "Created" }),
  updateEquipment: (req, res) => res.status(204).send(),
  deleteEquipment: (req, res) => res.status(200).json({ message: "Deleted" })
}));

// 2. Now import the router safely
const router = require('../routes/index');
const app = express();
app.use(express.json());
app.use('/', router);

describe('Gym Management API - GET Unit Tests', () => {
  it('should return 200 OK for GET /classes', async () => {
    const res = await request(app).get('/classes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return 200 OK for GET /memberships', async () => {
    const res = await request(app).get('/memberships');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return 200 OK for GET /trainers', async () => {
    const res = await request(app).get('/trainers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should return 200 OK for GET /equipment', async () => {
    const res = await request(app).get('/equipment');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
