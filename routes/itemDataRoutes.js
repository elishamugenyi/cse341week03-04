// routes/personalDataRoutes.js
const express = require('express');
const router = express.Router();
const itemDataController = require('../controllers/itemDataController');

// GET all items in personaldata collection
router.get('/', itemDataController.getAllItemData);

// POST/CREATE a new item to the personaldata collection
router.post('/', itemDataController.createItemData);

// PUT (update) an item by ID
router.put('/:id', itemDataController.updateItemData);


// DELETE an item by ID
router.delete('/:id', itemDataController.deleteItemData);

/**
 * @swagger
 * /itemdata:
 *   get:
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Successfully fetched all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemData'
 */

/**
 * @swagger
 * /itemdata:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemData'
 *     responses:
 *       201:
 *         description: Created new item successfully
 */

/**
 * @swagger
 * /itemdata/{id}:
 *   put:
 *     summary: Update an existing item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemData'
 *     responses:
 *       200:
 *         description: Item updated successfully
 */

/**
 * @swagger
 * /itemdata/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */

module.exports = router;
