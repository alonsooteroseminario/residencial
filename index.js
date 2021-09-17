const express = require('express')
const { client } = require('./controllers/msg');

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get('/reservar', (req, res) => {
  res.sendFile('./index.html', { root:__dirname })
})

app.get('/reservar/confirmacion', (req, res) => {

  res.send(`<p><b>Confirmacion de envio Ok!</b></p>`)
})

app.post('/reservar/enviar', (req, res) => {
  const data = req.body;
  console.log(data)

  client.messages.create({
    body: `Reserva de ${data.nombre} ${data.apellido} a las ${new Date().toLocaleString()} \n\n
    Mensaje completo: \n\n
    El usuario ${data.nombre} ${data.apellido} hizo una reserva a las ${new Date().toLocaleString()}
                                        
            Email: ${data.email} 
            DNI:  ${data.dni} 
            Teléfono:  ${data.telefono} 
            Ciudad:  ${data.ciudad} 
            Habitaciones:  ${data.habitaciones} 
            Fecha Ingreso: ${data.fechaIngreso} 
            Hora Ingreso: ${data.horaIngreso} 
            Hora Salida: ${data.horaSalida} 
            Forma de Pago: ${data.formaPago} `,
    // mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+51947308823'
    })
  .then(message => console.log(message.sid))
  .catch(console.log)  

  res.redirect('/reservar/confirmacion')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
