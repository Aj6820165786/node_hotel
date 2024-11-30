import 'dotenv/config'
import express from "express";
import db from "./db.js";
import passport from './middlewares/auth.middleware.js'

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());


// middleware function 
function logRequest(req,res,next){
    console.log(`[${new Date().toLocaleString()}] request to the ${req.originalUrl}`);
    next()
}

// use this middleware 
app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session: false})

app.get('/',localAuthMiddleware,(req,res)=>{
    res.send('welcome to hotel')
})

// import routes
import personRoutes from './routes/person.routes.js'
import menuRoutes from './routes/menu.routes.js'


// use routes
app.use('/person',localAuthMiddleware,personRoutes)
app.use('/menu',menuRoutes)

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
