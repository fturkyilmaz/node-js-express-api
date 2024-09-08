import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator"
import Task from "./task";


const router = Router();
let tasks: Task[] = [
    //     {
    //     id: 1,
    //     title: "Learn Node JS",
    //     description: "Learn advanced NodeJS",
    //     completed: false
    // }
];

const taskValidationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

// Read All tasks
router.get("/", (req: Request, res: Response) => {
    res.json(tasks)
})

// Task Create
router.post("/", taskValidationRules, (req: Request, res: Response) => {

   throw new Error("Crash baba")

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description } = req.body;

    const task: Task = {
        id: tasks.length + 1,
        title,
        description,
        completed: false
    }

    tasks.push(task);
    res.status(201).json(task)
})

//Read Sing Task
router.get("/:id", (req: Request, res: Response) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    const { query } = req;

    if (!task) {
        res.status(404).send(`Task not found ${query?.name}`);
    } else {
        res.json(task)
    }
})


// Update Task
router.put("/:id", taskValidationRules, (req: Request, res: Response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        res.status(404).send("Task not found");
    } else {
        const { title, description, completed } = req.body;
        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed || task.completed

        res.json(task)
    }
})


//Deleta Task
router.delete("/:id", (req: Request, res: Response) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (index === -1) {
        res.status(404).send("Task not found");
    } else {
        tasks.splice(index, 1)
        res.status(204).send();
    }
});


export default router;