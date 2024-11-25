import express from 'express';

const router = express.Router();

// Default preferences
let preferences = {
  notifications: true,
  language: 'English',
};

// GET: Retrieve user preferences
router.get('/', (req, res) => {
  res.status(200).send({message: 'Preferences updated successfully', preferences});
});

// POST: Update user preferences
router.post('/', (req, res) => {
  const { notifications, language } = req.body;

  // Validate request data
  if (typeof notifications === 'boolean' && typeof language === 'string') {
    preferences = { notifications, language };
    console.log('Updated Preferences:', preferences);
    res.status(200).send({ message: 'Preferences updated successfully', preferences });
  } else {
    res.status(400).send({ error: 'Invalid request data' });
  }
});

export default router;
