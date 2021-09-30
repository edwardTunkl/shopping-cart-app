import express from "express";
import db from "../../db/models/index.js";
const { Product, Review } = db;

const reviewRouter = express.Router();

//---Get---

reviewRouter.get("/", async (req, res, next) => {
  try {
    const data = await Review.findAll({
      include: Product,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//---Get:id---

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Review.findOne({where: {id:req.params.id},
    include: Product,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//---Get---

reviewRouter.get("/", async (req, res, next) => {
  try {
    res.status(200).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//---Delete---

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await Review.destroy({ where: { id: req.params.id } });
    if (rows > 0) {
      res.status(200).send("OK");
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//---POST---

reviewRouter.post("/", async (req, res, next) => {
  try {
    const data = await Review.create(req.body);
    res.status(204).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//---Put---

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).send(data[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewRouter
