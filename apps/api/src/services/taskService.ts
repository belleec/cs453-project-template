import { pool } from "../db/pool";

export async function getAllTasks() {
	return await pool.query(
		`SELECT id,
		        title,
		        description,
		        status,
		        created_at AS "createdAt",
		        updated_at AS "updatedAt"
		 FROM tasks
		 ORDER BY id`,
	);
}

export async function createTask(title: string, description: string) {
	return await pool.query(
		`INSERT INTO tasks (title, description)
		 VALUES ($1, $2)
		 RETURNING
		    id,
		    title,
		    description,
		    status,
		    created_at AS "createdAt",
		    updated_at AS "updatedAt"`,
		[title, description],
	);
}

export async function getTask(id: number) {
	return await pool.query(
		`SELECT id,
		        title,
		        description,
		        status,
		        created_at AS "createdAt",
		        updated_at AS "updatedAt"
		 FROM tasks
		 WHERE id = $1`,
		[id],
	);
}

export async function updateTask(
	id: number,
	title: string,
	description: string,
	status: string,
) {
	return await pool.query(
		`UPDATE tasks
		 SET title = $1,
		     description = $2,
		     status = $3,
		     updated_at = NOW()
		 WHERE id = $4
		 RETURNING
		    id,
		    title,
		    description,
		    status,
		    created_at AS "createdAt",
		    updated_at AS "updatedAt"`,
		[title, description, status, id],
	);
}

export async function deleteTask(id: number) {
	return await pool.query(
		`DELETE FROM tasks
		 WHERE id = $1`,
		[id],
	);
}