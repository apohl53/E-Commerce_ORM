const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });

    res.send(tags);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await Tag.findByPk(id, {
      include: Product,
    });

    if (tag) {
      res.send(tag);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
    return;
  }

  res.status(404).send("Tag not found");
});

// create a new tag
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const tag = await Tag.create(data);

    res.send({ message: "Tag added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// update a tag's name by its ID value
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const tag = await Tag.findByPk(id);

    if (!tag) {
      return res.status(404).send({ error: "Tag not found" });
    }

    tag.tag_name = newData.tag_name;

    await tag.save();

    res.send({ message: "Tag updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await Tag.destroy({
      where: {
        id,
      },
    });

    res.send({
      message: "Tag successfully deleted from the database!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
