import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos where deleted= FALSE ORDER BY id DESC");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { title, description, completed } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title, description, completed) VALUES ($1,$2,$3) RETURNING *",
    [title, description, completed]
  );
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const result = await pool.query(
    "UPDATE todos SET title=$1, description=$2, completed=$3 WHERE id=$4 RETURNING *",
    [title, description, completed, id]
  );

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE todos SET deleted = TRUE WHERE id = $1",
    [id]
  );
  res.json({ message: "deleted" });
});

export default router;