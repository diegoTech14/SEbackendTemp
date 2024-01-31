import { pool } from "../database.js";

//Returns the preferences response from the database
async function preferences(idUser) {
  return await pool.query("CALL getPreference(?);", [idUser]);
}

//Returns the recommendations response from the database
async function recommendations(idUser) {
  return await pool.query("CALL getRecomendation(?);", [idUser]);
}

export const methodRecommend = async (req, res) => {
  try {
    const id = req.query.id;
    //get preference value
    const [[[preferencesRows]]] = await preferences(id);

    let rows;

    if (preferencesRows.preference != 0) {
      [[rows]] = await pool.query("CALL getToursForRecomendation(?);", [
        preferencesRows.preference,
      ]);
    } else {
      //get recommendation value
      const [[[recomendationRows]]] = await recommendations(id);
      [[rows]] = await pool.query("CALL getToursForRecomendation(?);", [
        recomendationRows.result,
      ]);
    }
    return res.json(rows);

  } catch (error) {
    return res.status(500);
  }
};

export const counterTours = async (req, res) => {
  try {
    const { _id, _category } = req.query;

    await pool.query('CALL counterUpdate(?,?)', [_id, _category]);
    return res.status(200).json({ "data": 1 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": error });
  }
}

export const getDataUser = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(_id);
    const [[[data]]] = await pool.query('CALL dataUser(?);', _id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ "error": error })
  }
}
