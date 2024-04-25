const { incrementClick } = require('../services/click.service');

const addClick = async (req, res) => {
  try {
    const { userId } = req.body;
    await incrementClick(userId);
    res.status(201).json({ message: 'Click added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addClick,
};
