const router = require("express").Router();

// const tableNames = require('../../constants/tableNames');
const Planting = require("./model");

router.get("/", async (req, res) => {
  const Plantings = await Planting.query();
  res.json(Plantings);
});

router.post("/", async (req, res, next) => {
  const { name, start, end, producerId } = req.body;
  console.log(req.body);
  try {
    const planting = await Planting.query().insert({
      name,
      start,
      end,
      producer_id: producerId,
    });
    res.json({ message: "created successfuly", planting });
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, start, end } = req.body;
  try {
    const planting = await Planting.query().findById(id).patchAndFetchById(id, {
      name,
      start,
      end,
    });
    res.json({ message: "updated successfuly", planting });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Planting.query().deleteById(id);
    res.json({ message: "deleted successfuly" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
