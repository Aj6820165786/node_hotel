import 'dotenv/config'
import express from "express";
import db from "./db.js";


const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());

// Person Endpoints
import personRoutes from './routes/person.routes.js'
app.use('/person',personRoutes)

// Menu Endpoints
import menuRoutes from './routes/menu.routes.js'
app.use('/menu',menuRoutes)

app.listen(PORT, () => console.log("Server is listening at port 5000"));
