import { pool } from "../database.js";
import bcrypt from 'bcryptjs';
import InternalError from "../errors/handleError.js";

export const createUser = async (req, res) => {
  try {
    const { _name, _surname1, _surname2, _emailAddress, _password } = req.body;

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(_password, saltRounds);
    const [value] = await pool.query(
      'CALL createUser(?,?,?,?,?) ',
      [_name, _surname1, _surname2, _emailAddress, hashedPassword]
    );
console.log(value[0]);
    if (value[0] === 0) {
      return res.status(403).json({ message: "The user already exist" });
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return InternalError(res, error);
  }
};



export const login = async (req, res) => {
  try {
    const { _emailAddress, _password } = req.body;
    const [data] = await pool.query("CALL login(?)", [_emailAddress]);
    const comparacion = await bcrypt.compare(_password, data[0][0].password);
    if (comparacion) {
      return res.status(200).json(data);
    } else {
      return res.status(403).json({ message: 0 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 2 });
  }
};

export const changePreference = async (req, res) => {
  try {
    const { user_id, category_id } = req.query;

    const [rows] = await pool.query("CALL update_preference(?, ?);", [
      user_id,
      category_id,
    ]);

    if (!rows) {
      return res.status(404).json({ message: 0 });
    }
    return res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getPreference = async (req, res) => {
  try {
    const { userId } = req.query;

      const [rows] = await pool.query("CALL getPreference(?);", [
        userId
      ])
      if (rows[0].length <= 0) {
          return res.status(404).json({ message: 0 })
      }
      return res.json(rows[0])
  } catch (error) {
      return error;
  }
}
