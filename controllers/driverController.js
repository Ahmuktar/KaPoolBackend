const Driver = require('../models/Driver');
const User = require('../models/User');

// Create a new driver
const createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('driver_id');
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get driver by ID or all drivers if no ID is provided
const getDrivers = async (req, res) => {
  try {
    // Find drivers and populate related user details using 'driver_id' reference
    const drivers = await Driver.find()
      .populate('driver_id', 'name email phone user_type profile_image_url') // Populate 'User' fields
      .exec();

    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ error: 'No drivers found' });
    }

    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Update driver details
const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update driver availability
const updateDriverAvailability = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { is_available: req.body.is_available, updated_at: Date.now() },
      { new: true }
    );
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all available drivers
const getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ is_available: true });
    res.json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createDriver,
    getDriverById,
    updateDriver,
    updateDriverAvailability,
    getAvailableDrivers,
    deleteDriver,
    getDrivers
}