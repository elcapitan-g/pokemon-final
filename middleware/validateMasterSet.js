const saveMasterSet = (req, res, next) => {
  let { name, cards, percent_completed, year } = req.body;

  // Trim strings
  if (typeof name === 'string') name = name.trim();

  if (!name) {
    return res.status(400).json({ error: 'Set name is required' });
  }

  if (cards === undefined || typeof cards !== 'number' || cards <= 0) {
    return res.status(400).json({ error: 'Cards count must be a positive number' });
  }

  if (
    percent_completed === undefined ||
    typeof percent_completed !== 'number' ||
    !Number.isInteger(percent_completed) ||
    percent_completed < 0 ||
    percent_completed > 100
  ) {
    return res.status(400).json({ error: 'Percent completed must be an integer between 0 and 100' });
  }

  // Optional year validation
  if (year !== undefined) {
    if (
      typeof year !== 'number' ||
      !Number.isInteger(year) ||
      year < 1980 ||
      year > new Date().getFullYear() + 1
    ) {
      return res.status(400).json({ error: 'Valid year is required' });
    }
  }

  // Assign trimmed back
  req.body.name = name;
  req.body.year = year;

  next();
};

module.exports = { saveMasterSet };
