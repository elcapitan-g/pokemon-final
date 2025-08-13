const saveCard = (req, res, next) => {
  let { name, setName, rarity, price, release_year } = req.body;

  if (typeof name === 'string') name = name.trim();
  if (typeof setName === 'string') setName = setName.trim();
  if (typeof rarity === 'string') rarity = rarity.trim();

  // Validate 
  if (!name) {
    return res.status(400).json({ error: 'Card name is required' });
  }

  if (!setName) {
    return res.status(400).json({ error: 'Set name is required' });
  }

  if (!rarity) {
    return res.status(400).json({ error: 'Rarity is required' });
  }

  // Validate price
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }

  // Validate year 
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


  req.body.name = name;
  req.body.setName = setName;
  req.body.rarity = rarity;
  req.body.release_year = release_year;

  next();
};

module.exports = { saveCard };
