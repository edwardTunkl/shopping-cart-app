import express from 'express'
import s from "sequelize"
import db from '../../db/models/index.js'

const {Op} = s
const {Product, Review} = db

const productsRouter = express.Router()

//---GET---

productsRouter.get("/", async(req, res, next) =>{
  try {
    const data = await Product.findAll({
      include: Review,
      where: req.query.search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${req.query.search}%` } },
            { brand: { [Op.iLike]: `%${req.query.search}%` } },
            { category: { [Op.iLike]: `%${req.query.search}%` } },
          ],
        }
      : {},
    })
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//---GET:id---

productsRouter.get("/:id", async(req, res, next) =>{
  try {
    const data = await Product.findByPk(req.params.id)
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//---Delete---

productsRouter.delete("/:id", async(req, res, next) =>{
  try {
    const rows = await Product.destroy({where: {id:req.params.id}})
    if (rows >0 ){
      res.status(200).send("OK")
    } else {
      res.status(404).send("Not found")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//---Post---

productsRouter.post("/", async(req, res, next) =>{
  try {
    const data = await Product.create(req.body)
    res.status(204).send(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//---Put---

productsRouter.put("/:id", async(req, res, next) =>{
  try {
    const data = await Product.update(req.body, {
      where: {id: req.params.id},
      returning:true,
    })
    res.status(204).send(data[1][0])
  } catch (error) {
    console.log(error)
    next(error)
  }
})


export default productsRouter