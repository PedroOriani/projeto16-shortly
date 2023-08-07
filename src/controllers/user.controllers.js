export async function getInfos(req, res){

    const user = req.locals.user;

    try{

        const { response } = await db.query(`
            SELECT 
                users.id AS id,
                users.name AS name,
                SUM (urls."visitCount") AS "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            WHERE id=$1
            GROUP BY users.id
        `, [user.rows[0].id]);

        const userInfos = response[0];

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

        //GRUOP BY urls.id --> TALVEZ PRECISE COLOCAR ESSA ULTIMA LINHA NA "urls"

        const shortenedUrls = userInfos.rows.map(({urlId, shortUrl, url, visitCount}) => ({
            id: urlId,
            shortUrl: shortUrl,
            url: url,
            visitCount: visitCount
        }));

        const { id, name, visitCount } = userInfos;

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

    }catch (err){
        res.status(500).send(err.message)
    }
}