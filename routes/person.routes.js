import express from 'express'
import { Person } from '../models/person.models.js';
import { jwtAuthMiddleware, generateToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// signup

router.post("/signup", async (req, res) => {
    try {
        const person = new Person(req.body);
        const data = await person.save();
        console.log('Data saved:', data);

        const payload = { id: data.id, username: data.username };
        const token = generateToken(payload);
        console.log('Generated token:', token);

        res.status(201).json({ user: data, token });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// login

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Person.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const payload = { id: user.id, username: user.username };
        const token = generateToken(payload);

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// read
router.get("/",jwtAuthMiddleware, async (req, res) => {
    try {
        res.send(req.user.id)
        const data = await Person.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching persons:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// profile

router.get("/profile", jwtAuthMiddleware, async (req, res) => {

    try {
        const userData = req.user.id; // Extract user data from the token payload

        // Correct query to fetch user by ID
        const data = await Person.findById(userData);

        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /profile route:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


// update

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Person.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error updating person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// delete

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Person.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json({ message: "Person deleted", data });
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const data = await Person.find({work:workType})
            res.status(201).json(data)
        }else{
            res.status(404).json({error:"Invalid work type"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal server error"})
    }
})


export default router;
