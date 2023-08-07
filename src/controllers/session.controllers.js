import bcrypt from "bcrypt"
import { db } from '../database/database.connection.js'
import { v4 as uuid } from "uuid";

export async function signUp(req, res){

    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    try{

        const doubleEmail = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (doubleEmail.rowCount === 1) return res.status(409).send({message: 'Este e-mail ja está cadastrado'});

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);

        res.sendStatus(201);

    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res){

    const { email, password } = req.body

    try{

        const response = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);

        if (response.rowCount === 0) return res.status(401).send({message: 'Este e-mail não foi cadastrado'});

        const user = response.rows[0];

        const correctPassword = bcrypt.compareSync(password, user.password);

        if (!correctPassword) return res.status(401).send({message: 'Senha incorreta'});

        await db.query(`DELETE FROM sessions WHERE id=$1;`, [user.id])

        const token = uuid();

        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [user.id, token])

        res.status(200).send(token)

    }catch (err){
        res.status(500).send(err.message);
    }
}