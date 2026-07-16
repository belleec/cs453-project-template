import { Router } from "express";
import { getAllTasks } from "../services/taskService";
import { createTask } from "../services/taskService";
import { getTask } from "../services/taskService";
import { updateTask } from "../services/taskService";
import { deleteTask } from "../services/taskService";


const router = Router();

router.get("/", async (_req, res) => {
	try {
		const result = await getAllTasks();
		res.json(result.rows);
	} catch (error) {
		console.error("Failed to fetch tasks:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch tasks",
		});
	}
});

router.post("/", async (req, res) => {
	try {
		const title = req.body?.title?.trim();
        let description = req.body?.description?.trim();

        if (description === undefined) {
            description = "";
        }
		if (!title) {
			return res.status(400).json({
				error: "Title is required",
			});
		}
		const result = await createTask(title, description);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error("Failed to create task:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to create task",
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
        const result = await getTask(id);
		if (result.rows.length === 0) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		res.json(result.rows[0]);
	} catch (error) {
		console.error("Failed to fetch task:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to fetch task",
		});
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
        const current = await getTask(id);

		if (current.rows.length === 0) {
			return res.status(404).json({
				error: "Task not found",
			});
		}

		const task = current.rows[0];

		let title = task.title;
		if (req.body?.title !== undefined) {
			title = req.body.title.trim();
		}

		let description = task.description;
        if (description === null) {
            description = "";
        }
        if (req.body?.description !== undefined) {
            description = req.body.description.trim();
        }

		let status = task.status;
		if (req.body?.status !== undefined) {
			status = req.body.status;
		}

		if (!title) {
			return res.status(400).json({
				error: "Title is required",
			});
		}
        const result = await updateTask(
            id,
            title,
            description,
            status,
        );
		res.json(result.rows[0]);
	} catch (error) {
		console.error("Failed to update task:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to update task",
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
        const result = await deleteTask(id);

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Task not found",
            });
        }
		res.status(204).end();
	} catch (error) {
		console.error("Failed to delete task:", error);
		res.status(500).json({
			status: "error",
			message: "Failed to delete task",
		});
	}
});

export default router;