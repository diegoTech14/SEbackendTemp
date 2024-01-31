import { pool } from "../database.js";


export const tours = async (req, res) => {
    try {
        const [rows] = await pool.query("CALL ObtenerInfoTours();")
        if (rows[0].length <= 0) {
            return res.status(404).json({ message: "Tours no encontrados." })
        }
        return res.json(rows[0])
    } catch (error) {
        return error;
    }
}