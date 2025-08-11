module.exports = (req, res, next) => {
  const { name, scientific_name, size_meters, num_human_kills, habitat, aggressiveness, order } = req.body;

  if (!name || !scientific_name || !size_meters || !habitat || !order) {
    return res.status(400).json({ error: 'Missing required shark fields.' });
  }

  const validHabitats = ['coastal', 'pelagic', 'deep ocean'];
  if (!validHabitats.includes(habitat)) {
    return res.status(400).json({ error: 'Invalid habitat value.' });
  }

  next(); //this aint it cheif
};
