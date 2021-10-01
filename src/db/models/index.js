import Category from './categories.js';
import Product from './products.js'
import Review from './reviews.js' 
import User from './users.js';
import ProductCategory from './productCategories.js'
//1. choose the type of relationship (1:1, 1:n, n:m)
// 1:n

// 2. understand what methods to use for this specific type of relationship
// hasMany & belongsTo

//3. understand for each association which model is TARGET & which model is SOURCE
// A.hasMany(B) => foreign key in the the TARGET B model

//---One-to-many---

Product.hasMany(Review); // => authorId  Author.findAll({include: Article})
Review.belongsTo(Product); // => Article.findAll({include:Author})

User.hasMany(Review, { foreignKey: "user_id" })
Review.belongsTo(User, { foreignKey: "user_id" })

//---Many-to-many---

Product.belongsToMany(Category,{
  through: { model:ProductCategory, unique: false},
})
Category.belongsToMany(Product,{
  through: { model:ProductCategory, unique: false},
})


export default { Product, Review, User, Category, ProductCategory };