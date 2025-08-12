const saveMasterSet = (req, res, next) => {
  let { name, cards, price, release_year } = req.body;

  // Trim strings
  if (typeof name === 'string') name = name.trim();

  if (!name) {
    return res.status(400).json({ error: 'Set name is required' });
  }

  if (cards === undefined || typeof cards !== 'number' || cards <= 0) {
    return res.status(400).json({ error: 'Cards count must be a positive number' });
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }

  // Optional release_year validation
  if (release_year !== undefined) {
    if (
      typeof release_year !== 'number' ||
      !Number.isInteger(release_year) ||
      release_year < 1980 ||
      release_year > new Date().getFullYear() + 1
    ) {
      return res.status(400).json({ error: 'Valid release_year is required' });
    }
  }

  // Assign trimmed back
  req.body.name = name;
  req.body.release_year = release_year;

  next();
};

module.exports = { saveMasterSet };
