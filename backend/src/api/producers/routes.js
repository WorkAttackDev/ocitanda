const router = require("express").Router();
const { body } = require("express-validator");

// const tableNames = require("../../constants/tableNames");
const Producer = require("./model");
const Planting = require("../plantings/model");

router.get("/", async (req, res, next) => {
  try {
    const producers = await Producer.query().withGraphFetched("plantings");
    console.log(producers);
    res.json(producers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const producer = await Producer.query()
      .findById(id)
      .withGraphFetched("plantings");
    if (producer) return res.json(producer);
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/",
  [body("name").isString().notEmpty()],
  async (req, res, next) => {
    const { name } = req.body;
    try {
      await Producer.query().insert({ name });
      res.json({ message: "created successfuly" });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/:id",
  [body("name").isString().notEmpty()],
  async (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
      await Producer.query().findById(id).patch({ name });
      res.json({ message: "updated successfuly" });
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const prod = await Producer.query().findById(id).withGraphFetched("plantings");

      prod.plantings.forEach(async (_p)=> {
        if(_p.id) await Planting.query().deleteById(_p.id);
      });

      await Producer.query().deleteById(id);
      res.json({ message: "deleted successfuly" });
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
