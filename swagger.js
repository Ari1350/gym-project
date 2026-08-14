const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym Management API',
    description: 'Final Project - Part 2. Full CRUD for Classes, Memberships, Trainers, and Equipment with OAuth protection.'
  },

  host: 'gym-project-948y.onrender.com', 
  schemes: ['https'],
  definitions: {
    Class: {
      name: "Zumba Fitness",
      trainer: "John Doe",
      schedule: "Tuesday and Thursday 07:00 PM",
      capacity: 20,
      status: "active"
    },
    Membership: {
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      planType: "Monthly",
      status: "active"
    },
    Trainer: {
      firstName: "David",
      lastName: "Miller",
      specialty: "Bodybuilding",
      phone: "555-0199",
      status: "active"
    },
    Equipment: {
      itemName: "Treadmill Professional",
      area: "Cardio",
      quantity: 5,
      condition: "good",
      status: "active"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
