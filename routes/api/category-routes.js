const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryAll = await Category.findAll({
      include: {model: Product},
    });
    res.status(200).json(categoryAll);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const specificCat = await Category.findByPk(req.params.id, {
      include: {model: Product},
    });

    if (!specificCat) {
      res.status(404).json({ message: 'No category with that ID exists!'});
      return;
    }
    res.status(200).json(specificCat);
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then((newCat) => {
    res.json(newCat);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
    category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )
  .then((updateCat) => {
    res.json(updateCat);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    },
  )
  .then((removeCat) => {
    res.json(removeCat);
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;
