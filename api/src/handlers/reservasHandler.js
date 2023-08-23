const {
  reservaCita,
  getAllAppointmentsController,
  putController,
} = require("../controllers/reservaController");

const { Reserva } = require('../db.js')
// utils 
const mailer= require('../helpers/emailers.js')

const reservarCitaHandler = async (req, res) => {
  const { data } = req.query;
  console.log(data);
  const decodedObj = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
  console.log('dataDescifrada', decodedObj);
  

  try { 
    //  const verifyCita = await Reserva.findAll({
    //   where: {
    //     estado: estado
    //   }
    //  })
    //  if(verifyCita.length){
    //   throw new Error('Ya existe una cita con este pago')
    //  }
    // const postReserva = await reservaCita({ idPsico, idUser, estado, hora, fecha });

    // let dataValues = postReserva[0]
    // console.log('la reserva', dataValues);
    

      res.status(200).json(decodedObj);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppointmentsHandler = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsController();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putHandler = async (req, res) => {
  const data = req.body;

  const requiredProperties = ["id", "estado"];
  const propertyTypes = {
    id: "string",
    estado: "string",
  };

  const missingProperties = [];
  const invalidTypeProperties = [];

  for (const property of requiredProperties) {
    if (!(property in data)) {
      missingProperties.push(property);
    } else if (typeof data[property] !== propertyTypes[property]) {
      invalidTypeProperties.push(property);
    }
  }

  if (missingProperties.length > 0) {
    return res
      .status(400)
      .send(
        `Faltan las siguientes propiedades: ${missingProperties.join(", ")}`
      );
  }

  if (invalidTypeProperties.length > 0) {
    return res
      .status(400)
      .send(
        `Las siguientes propiedades tienen tipos inválidos: ${invalidTypeProperties.join(
          ", "
        )}`
      );
  }

  await putController(req, res);
};

module.exports = {
  reservarCitaHandler,
  getAllAppointmentsHandler,
  putHandler,
};
