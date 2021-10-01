import express from 'express'
import s from "sequelize"
import Category from '../../db/models/categories.js'
import db from '../../db/models/index.js'
import UserProduct from '../../db/models/userProducts.js'

const {Op} = s
const {Product, Review, ProductCategory, User} = db

const productsRouter = express.Router()

//---GET---

productsRouter.get("/", async(req, res, next) =>{
  try {
    const data = await Product.findAll({
      include: [
        { model: Category, through: { attributes: [] } },
        // { model: Review, include: User }
        { model: User, through: { attributes: [] } },
      ],
      where: req.query.search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${req.query.search}%` } },
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
    //inser postId and categoryId to many-to-many table
    const categoryData = await ProductCategory.create({
      categoryId: req.body.categoryId,
      productId: data.dataValues.id
    })
    const userData = await UserProduct.create({
      userId: req.body.userId,
      productId: data.dataValues.id
    })
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