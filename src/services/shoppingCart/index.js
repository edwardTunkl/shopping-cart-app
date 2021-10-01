import express from "express";
import db from "../../db/models/index.js";
const { UserProduct, Product, User } = db;

const shoppingCartRouter = express.Router();

//---Get---

shoppingCartRouter.get("/", async (req, res, next) => {
  try {
    const data = await UserProduct.findAll({
      attributes: ["userId", "productId"],
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Get:id---

shoppingCartRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await UserProduct.findByPk({where: {id:req.params.id}
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Delete---

shoppingCartRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await UserProduct.destroy({ where: { id: req.params.id } });
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

shoppingCartRouter.post("/", async (req, res, next) => {
  try {
    const data = await UserProduct.create(req.body);
    res.status(204).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Put---

shoppingCartRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await UserProduct.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).send(data[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default shoppingCartRouter
