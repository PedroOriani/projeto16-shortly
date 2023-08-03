import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try{

        const response = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        if (response.rowCount === 0) return res.status(401).send({message: 'Faça log-in para utilizar o Shortly'});

        res.locals.session = response.rows[0];

        next();

    }catch (err){
        res.status(500).send(err.message)
    }
}