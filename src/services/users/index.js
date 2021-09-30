import express from "express";
import s from "sequelize";
import db from "../../db/models/index.js";

const { Op } = s;
const { User } = db;

const usersRouter = express.Router();

//---Get---

usersRouter.get("/", async (req, res, next) => {
  try {
    const data = await User.findAll();
    res.status(200).send(data)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Get:id---

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findOne({where: {id:req.params.id}})
    res.status(200).send(data);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Delete---

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const rows = await User.destroy({ where: { id: req.params.id }})
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

//---Post---

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = await User.create(req.body)
    res.status(204).send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//---Put---

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.status(200).send(data[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default usersRouter;
