import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { routes as BookRoutes } from "./routes/book-routes.js";

// Configuración de Variables de Entorno
dotenv.config();
const port = process.env.PORT || 8000;

// Uso de middlewares con express
const app = express();
app.use(bodyParser.json());

console.log(process.env.MONGO_URL);

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB");
});

app.use("/books", BookRoutes);
app.listen(port, () => console.log(`Listening Server: http://localhost:${port}`));
