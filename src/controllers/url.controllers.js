import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortingUrl(req, res){

    const url = req.body.url;
    const user = res.locals.user;

    const shortUrl = nanoid();

    try{

        await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);` [user.rows[0].id, url, shortUrl]);

        const postedUrl = await db.query(`SELECT * FROM url WHERE "shortUrl=$1;` [shortUrl])

        res.status(200).send({id: postedUrl.rows[0].id, shortUrl})

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getUrlById(req, res){

    const { id } = req.params

    try{

        const verId = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

        if (verId.rows.length === 0) return res.sendStatus(404);

        res.status(200).send({id: verId.rows[0].id, shortUrl: verId.rows[0].shortUrl, url: verId.rows[0].url})

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function openUrl(req, res){
    try{

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function deleteUrl(req, res){
    try{

    }catch (err){
        res.status(500).send(err.message)
    }
}