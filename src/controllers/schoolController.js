const db = require('../config/db');
const calculateDistance = require('../utils/distanceCalculator');

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({
      success: false,
      message: 'Invalid latitude value'
    });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: 'Invalid longitude value'
    });
  }

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, address, latitude, longitude],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Database error',
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: 'School added successfully',
        schoolId: result.insertId
      });
    }
  );
};

const listSchools = (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({
      success: false,
      message: 'Invalid latitude value'
    });
  }

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: 'Invalid longitude value'
    });
  }

  const query = 'SELECT * FROM schools';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: err.message
      });
    }

    const schoolsWithDistance = results.map((school) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance: distance.toFixed(2)
      };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      schools: schoolsWithDistance
    });
  });
};

module.exports = {
  addSchool,
  listSchools
};