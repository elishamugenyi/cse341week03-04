// routes/personalDataRoutes.js
const express = require('express');
const router = express.Router();
const personalDataController = require('../controllers/personalDataController');

// GET all items in personaldata collection
router.get('/', personalDataController.getAllPersonalData);

// POST/CREATE a new item to the personaldata collection
router.post('/', personalDataController.createPersonalDataItem);

// PUT (update) an item by ID
router.put('/:id', personalDataController.updatePersonalDataItem);


// DELETE an item by ID
router.delete('/:id', personalDataController.deletePersonalDataItem);

/**
 * @swagger
 * /personaldata:
 *   get:
 *     summary: Get all personal data items
 *     responses:
 *       200:
 *         description: Successfully fetched all personal data items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PersonalData'
 */

/**
 * @swagger
 *  post:
 *     summary: Create a new personal data item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalData'
 *     responses:
 *       201:
 *         description: Created new personal data item successfully
 */

/**
 * @swagger
 *  put:
 *     summary: Update existing personal data item based on ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalData'
 *     responses:
 *       200:
 *         description: Item Updated successfully
 */


/**
 * @swagger
 *  delete:
 *     summary: Delete an item based on ID 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalData'
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */

module.exports = router;
