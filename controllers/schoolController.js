const { validationResult } = require('express-validator');
const { insertSchool, getAllSchools } = require('../models/schoolModel');
const { getDistance } = require('../config/haversine');

const addSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { name, address, latitude, longitude } = req.body;

  try {
    const result = await insertSchool({ name, address, latitude, longitude });
    return res.status(201).json({
      success: true,
      message: 'School added successfully.',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.error('addSchool error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const listSchools = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  try {
    const schools = await getAllSchools();

    const sorted = schools
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          getDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: 'Schools fetched and sorted by proximity.',
      user_location: { latitude: userLat, longitude: userLon },
      total: sorted.length,
      data: sorted,
    });
  } catch (err) {
    console.error('listSchools error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { addSchool, listSchools };
