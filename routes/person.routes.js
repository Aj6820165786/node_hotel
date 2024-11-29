import express from 'express'
import { Person } from '../models/person.models.js';
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching persons:", error);
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

router.post("/", async (req, res) => {
    try {
        const person = new Person(req.body);
        const data = await person.save();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error saving person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Person.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router