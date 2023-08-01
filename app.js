import express from "express"

const app = express();

app.use(express.json())
app.use(cors);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})
