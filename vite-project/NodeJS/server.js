import express from "express";
import mongoose from "mongoose";
import productRoutes  from "./Routes/productsRoutes.js";
import cartRoutes from './Routes/cartRoutes.js';
import authRoutes from "./Routes/authRoutes.js";
//const router = express.Router();

const app = new express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/ShoppyGlobe")
const db = mongoose.connection;
db.on("open" , ()=>{
    console.log("connect successful");
});
db.on("error" , ()=>{
    console.log("connect not successful");
});
 
app.listen(3000, ()=>{
    console.log("server is run at 3000 port");
}
);
//router(app);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);



