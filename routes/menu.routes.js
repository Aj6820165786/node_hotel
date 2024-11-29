import express from 'express'
import {Menu} from '../models/menu.models.js'
const router = express.Router()


router.post("/", async (req, res) => {
    try {
        const menu = new Menu(req.body);
        const data = await menu.save();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error saving menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:tasteType',async(req,res)=>{
    try {
        const tasteType = req.params.tasteType
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const data = await Menu.find({taste:tasteType})
            res.status(201).json(data)
        }else{
            res.status(404).json({error:"Invalid taste type"})
        }
    } catch (error) {
        console.error(error)
        res.send(500).json({error:"Internal server error"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Menu.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router