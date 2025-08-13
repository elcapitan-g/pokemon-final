const validateETB = (req, res, next) => {
  let { name, year, price_usd } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }
  name = name.trim();

  if (typeof year !== 'number' || !Number.isInteger(year) || year < 1980 || year > new Date().getFullYear() + 1) {
    return res.status(400).json({ error: 'Valid year is required.' });
  }

  if (typeof price_usd !== 'number' || price_usd < 0) {
    return res.status(400).json({ error: 'Valid price_usd is required.' });
  }

  req.body.name = name;
  req.body.year = year;
  req.body.price_usd = price_usd;

  next();
};

module.exports = { validateETB };
