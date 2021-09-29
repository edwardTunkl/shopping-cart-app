import express from 'express'
import cors from 'cors'
import listEndpoints from "express-list-endpoints";
import {connectDataBase} from './db/index.js'

const server = express()
const PORT = process.env.PORT || 3001;





//--- Global middleware---

server.use(cors())
server.use(express.json());

server.use("/products", productsRouter)
server.use("/reviews", reviewRouter)



console.table(listEndpoints(server));

server.listen(PORT, async () => {
  await connectDataBase();
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("Server has error -> STOPPED ", error);
});