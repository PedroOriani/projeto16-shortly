import { db } from "../database/database.connection.js";

export async function getInfos(req, res){

    const user = req.locals.user;

    try{

        const response = await db.query(`
            SELECT 
                users.id AS id,
                users.name AS name,
                SUM (urls."visitCount") AS "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            WHERE id=$1
            GROUP BY users.id
        `, [user.rows[0].id]);

        const urls = await db.query(`
            SELECT 
                urls.id AS "urlId",
                urls."shortUrl" AS "shortUrl",
                urls.url AS url,
                urls."visitCount" AS "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            WHERE users.id=$1
        `, [user.rows[0].id])

        //GROUP BY urls.id --> TALVEZ PRECISE COLOCAR ESSA ULTIMA LINHA NA "urls"

        const shortenedUrls = urls.rows.map(({urlId, shortUrl, url, visitCount}) => ({
            id: urlId,
            shortUrl: shortUrl,
            url: url,
            visitCount: visitCount
        }));

        const { id, name, visitCount } = response.rows[0];

        const infos ={
            id,
            name,
            visitCount,
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
                user.id AS id,
                users.name AS name,
                COUNT(urls.id) AS "linksCount",
                SUM (url."visitCount") AS "visitCount"
            FROM user
            LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `)

        res.status(200).send(response);

    }catch (err){
        res.status(500).send(err.message)
    }
}