import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try{

        const response = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token]);

        if (response.rowCount === 0) return res.status(401).send({message: 'Faça log-in para utilizar o Shortly'});

        const user = await db.query(`SELECT * FROM users WHERE id=$1;`, [response.rows[0].userId]);

        if (!user) return res.status(401).send('Usuário não autorizado')

        res.locals.user = user

        next();

    }catch (err){
        res.status(500).send('erro na validationAuth')
    }
}