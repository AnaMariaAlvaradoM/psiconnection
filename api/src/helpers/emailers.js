const nodemailer = require('nodemailer');


const { htmlTemplatePsicologo } = require('../utils/const.js')



//! Funcion principal de transport 

// nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // use TLS
//     auth: {
//       user: "grupobackend93@gmail.com",
//       pass: "cjotmogpteafdpak",
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });


const createTrans = () => {
//     const transport = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "9c6f14bd4dbec3",
//             pass: "fa0f9b8a58d411"
//   }
//     })
    const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use TLS
            auth: {
                user: "grupobackend93@gmail.com",
                pass: "cjotmogpteafdpak",
            },
    //     tls: {
    //   // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //     },
  });
    transport.verify().then(
        () => {
            console.log('Ready to send emails');
        }
    )
    return transport
}


const sendMailRegister = async (psicologo) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Psiconection 👨‍⚕️👩‍⚕️" <magno@exaple.com>',
        to: `${psicologo.email}`,
        subject: `Bienvenido ${psicologo.nombre} ${psicologo.apellido} a psiconnection 👨‍⚕️👩‍⚕️`,
        html: htmlTemplatePsicologo
        // html: `<b> Welcome ${psicologo.nombre} ${psicologo.apellido} to psiconnection 👨‍⚕️👩‍⚕️</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    
    return 
}


const sendMailReserva = async ({newReserva, psicologo, usuario}) => {
    console.log('nueva reserva',newReserva);
    
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Psiconection 👨‍⚕️👩‍⚕️" <magno@exaple.com>',
        to:[ `${psicologo.email}`, `${usuario.email}`],
        subject: `Cita reservada id ${newReserva.id}`,
        html: `<h1>Psicologo: ${psicologo.nombre} ${psicologo.apellido} ${psicologo.email}</h1>
                <h2>Cita reservada por ${usuario.nombre} ${usuario.apellido} ${usuario.email}</h2>
                <h2>Hora: ${newReserva.hora}</h2>
                <h2>Fecha: ${newReserva.fecha}</h2>`,
        // html: `<b> Welcome ${psicologo.nombre} ${psicologo.apellido} to psiconnection 👨‍⚕️👩‍⚕️</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    
    return 
}


exports.sendMailRegister = (psicologo) => sendMailRegister(psicologo)

exports.sendMailReserva = ({newReserva, psicologo, usuario}) => sendMailReserva({newReserva, psicologo, usuario}) 

