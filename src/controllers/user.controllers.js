import { db } from "../database/database.connection.js";

export async function getInfos(req, res){

    const user = res.locals.user;

    try{

        const { response } = await db.query(`
            SELECT 
                users.id AS id,
                users.name AS name,
                SUM (urls."visitCount") AS "visitCount"
            FROM urls
            JOIN users ON urls."userID" = users.id
            WHERE users.id=$1
            GROUP BY users.id
        `, [user.id]);

        const urls = await db.query(`
            SELECT 
                urls.id AS "urlId",
                urls."shortUrl" AS "shortUrl",
                urls.url AS url,
                urls."visitCount" AS "visitCount"
            FROM urls
            JOIN users ON urls."userID" = users.id
            WHERE users.id=$1
            GROUP BY urls.id
        `, [user.id])

        const shortenedUrls = urls.rows.map(({urlId, shortUrl, url, visitCount}) => ({
            id: urlId,
            shortUrl,
            url,
            visitCount
        }));

        const userData = response[0];

        const { id, name, visitCount } = userData;

        const infos ={
            id: id,
            name: name,
            visitCount: visitCount,
            shortenedUrls: shortenedUrls
        }

        res.status(200).send(infos);

    }catch (err){
        res.status(500).send(err.message)
    }
}

export async function getRanking(req, res){

    try{

        const response = await db.query(`
            SELECT
                users.id AS id,
                users.name AS name,
                COUNT(urls.id) AS "linksCount",
                SUM (urls."visitCount") AS "visitCount"
            FROM users
            LEFT JOIN urls ON users.id = urls."userID"
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `)

        const ranking = response.rows.map(({id, name, linksCount, visitCount}) => ({
            id,
            name,
            linksCount,
            visitCount
        }))

        res.status(200).send(ranking);

    }catch (err){
        res.status(500).send(err.message)
    }
}