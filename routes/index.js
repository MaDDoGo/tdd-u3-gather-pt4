const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.get('/items/:itemId', async (req, res, next) => {
    const {itemId} = req.params;

    const item = await Item.find();
    if (!item) {
      res.redirect('/');
    } else {
      res.render('single-item', { item: item.filter((f) => f._id.toString() === itemId)[0] });
    }
});

module.exports = router;
