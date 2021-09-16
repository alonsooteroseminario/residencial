const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get('/reservar', (req, res) => {
  res.sendFile('./public/index.html', { root:__dirname })
})

app.post('/reservar/enviar', (req, res) => {
  const data = req.body;
  console.log(data)
  res.status(200).json(data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
