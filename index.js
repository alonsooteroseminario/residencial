const express = require('express')
const { transporterGmail } = require('./controllers/email');

const app = express()
const port = process.env.PORT.toString() || parseInt(process.argv[2]) || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get('/reservar', (req, res) => {
  res.sendFile('./public/index.html', { root:__dirname })
})

app.get('/reservar/confirmacion', (req, res) => {

  res.send(`<p><b>Confirmacion de envio Ok!</b></p>`)
})

app.post('/reservar/enviar', (req, res) => {
  const data = req.body;
  console.log(data)
  const mailOptionsLogin = {
    from: 'Servidor Login',
    // to: 'kadin.bernier77@ethereal.email',
    to: process.env.EMAIL_RECEPTOR.toString(),
    subject: `Reserva de ${data.nombre} ${data.apellido} a las ${new Date().toLocaleString()}`,
    html: `<h1 style="color: blue;">El usuario ${data.nombre} ${data.apellido} se hecho una reserva a las ${new Date().toLocaleString()} </h1>
                                              <br><br>
                                                 <li> Email: ${data.email} </li>
                                                 <li> DNI:  ${data.dni} </li>
                                                 <li> Telefono:  ${data.telefono} </li>
                                                 <li> Ciudad:  ${data.ciudad} </li>
                                                 <li> Habitaciones:  ${data.habitaciones} </li>
                                                 <li> Fecha Ingreso: ${data.fechaIngreso} </li>
                                                 <li> Hora Ingreso: ${data.horaIngreso} </li>
                                                 <li> Hora Salida: ${data.horaSalida} </li>
                                                 <li> Forma de Pago: ${data.formaPago} </li>`
  };

  transporterGmail.sendMail(mailOptionsLogin, (err, info) => {
    if(err) {
        console.log(err)
        return err
    }
    
  })

  res.redirect('/reservar/confirmacion')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
