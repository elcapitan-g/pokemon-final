// src/middleware/validateChase.js
const saveChase = (req, res, next) => {
  let { name, set, psa10_price_usd, year } = req.body;

  if (typeof name === 'string') name = name.trim();
  if (typeof set === 'string') set = set.trim();

  if (!name) {
    return res.status(400).json({ error: 'Card name is required' });
  }

  if (!set) {
    return res.status(400).json({ error: 'Set name is required' });
  }

  if (
    psa10_price_usd === undefined ||
    typeof psa10_price_usd !== 'number' ||
    psa10_price_usd < 0
  ) {
    return res.status(400).json({ error: 'Valid psa10_price_usd is required' });
  }

  if (
    year !== undefined &&
    (typeof year !== 'number' || !Number.isInteger(year) || year < 1980 || year > new Date().getFullYear() + 1)
  ) {
    return res.status(400).json({ error: 'Valid year is required' });
  }

  req.body.name = name;
  req.body.set = set;
  req.body.psa10_price_usd = psa10_price_usd;
  req.body.year = year;

  next();
};

module.exports = { saveChase };
