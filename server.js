import express from "express";
import { Person } from "./models/person.models.js";
import { Menu } from "./models/menu.models.js";
import db from "./db.js";

const app = express();
app.use(express.json());

// Person Endpoints
import personRoutes from './routes/person.routes.js'
app.use('/person',personRoutes)

// Menu Endpoints
import menuRoutes from './routes/menu.routes.js'
app.use('/menu',menuRoutes)

app.listen(5000, () => console.log("Server is listening at port 5000"));
