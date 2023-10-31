const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });

    res.send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// find one category by its `id` value
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id, {
      include: Product,
    });

    if (category) {
      res.send(category);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }
  res.status(404).send("Category not found");
});

// create a new category
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const category = await Category.create(data);

    res.send({ message: "Category added!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    category.category_name = newData.category_name;

    await category.save();

    res.send({ message: "Category updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: "Category deleted from database!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
