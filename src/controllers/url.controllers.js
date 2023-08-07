import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function shortingUrl(req, res){

    const { url } = req.body;
    
    const user = res.locals.user;

    const shortUrl = nanoid(8);

    try{

        await db.query(`INSERT INTO urls ("userID", url, "shortUrl") VALUES ($1, $2, $3);`, [user.rows[0].id, url, shortUrl]);

        const postedUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);

        res.status(201).send({id: postedUrl.rows[0].id, shortUrl: shortUrl});

    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res){

    const { id } = req.params;

    try{

        const verId = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

        if (verId.rowCount === 0) return res.sendStatus(404);

        res.status(200).send({id: verId.rows[0].id, shortUrl: verId.rows[0].shortUrl, url: verId.rows[0].url});

    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res){

    const { shortUrl } = req.params;

    try{

        const response = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);

        if (response.rowCount === 0) return res.sendStatus(404);

        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl]);

        const url = response.rows[0].url;

        res.redirect(url);

    }catch (err){
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){

    const { id } = req.params;

    const user = res.locals.user;

    try{

        const response = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);

        if (response.rowCount === 0) return res.sendStatus(404);

        const verUser = await db.query(`SELECT * FROM urls WHERE id=$1 AND "userID"=$2;`, [id, user.rows[0].id]);

        if (verUser.rowCount === 0) return res.sendStatus(401);

        await db.query(`DELETE FROM urls WHERE id=$1;`, [id]);

        res.sendStatus(204);

    }catch (err){
        res.status(500).send(err.message);
    }
}