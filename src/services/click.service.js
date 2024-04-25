const Clicks = require('../models/click.model');

const incrementClick = async (userId) => {
  try {
    const click = await Clicks.findOneAndUpdate(
      { userId },
      { $inc: { totalCount: 1 } },
      { upsert: true, new: true }
    );
    return click;
  } catch (error) {
    throw new Error('Failed to increment click count');
  }
};

module.exports = {
  incrementClick,
};
