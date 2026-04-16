const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');
const { addSchoolValidation, listSchoolsValidation } = require('../middlewares/schoolValidation');

/**
 * @swagger
 * /api/addSchool:
 *   post:
 *     summary: Add a new school
 *     description: Creates a new school entry with a name, address, latitude, and longitude.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *                 format: float
 *               longitude:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: School added successfully
 *       422:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.post('/addSchool', addSchoolValidation, addSchool);

/**
 * @swagger
 * /api/listSchools:
 *   get:
 *     summary: List all schools sorted by proximity
 *     description: Returns a list of schools ordered by their distance from the provided coordinates.
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: The user's latitude
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *           format: float
 *         required: true
 *         description: The user's longitude
 *     responses:
 *       200:
 *         description: Schools fetched successfully
 *       422:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.get('/listSchools', listSchoolsValidation, listSchools);

module.exports = router;
