const { body, query } = require('express-validator');

const addSchoolValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isString().withMessage('Name must be a string.')
    .isLength({ max: 255 }).withMessage('Name must not exceed 255 characters.'),

  body('address')
    .trim()
    .notEmpty().withMessage('Address is required.')
    .isString().withMessage('Address must be a string.')
    .isLength({ max: 500 }).withMessage('Address must not exceed 500 characters.'),

  body('latitude')
    .notEmpty().withMessage('Latitude is required.')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a float between -90 and 90.'),

  body('longitude')
    .notEmpty().withMessage('Longitude is required.')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a float between -180 and 180.'),
];

const listSchoolsValidation = [
  query('latitude')
    .notEmpty().withMessage('Latitude query param is required.')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a float between -90 and 90.'),

  query('longitude')
    .notEmpty().withMessage('Longitude query param is required.')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a float between -180 and 180.'),
];

module.exports = { addSchoolValidation, listSchoolsValidation };
