import express, { NextFunction, Request, Response } from "express"
import taskRoutes from "./routes/tasks"
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000

app.use(express.json()); // Add This enable JSON parsing request body!
app.use("/tasks", taskRoutes) // Task api routes 

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Typescript Express!");
});

app.use(cors())

app.use((err: Error, req: Request, res: Response) => {
    console.error(err);

    res.status(500).send("Something went wrong");
})

app.get("*", (req: Request, res: Response) => {
    res.send(`Not Found! `);
});

app.listen(port, () => {
    console.log("Express listening on port")
})
