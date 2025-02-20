import {
  randomName,
  randomLastName,
  randomNumber,
  randomString,
  randomDomain,
} from "../helpers/random";

const name = randomName();
const lastName = randomLastName();

const formValues = {
  mandatory: {
    nombre: name,
    apellido: lastName,
    email: `${name}${lastName}@${randomDomain()}`, // Usamos el mismo nombre en el email
    telefono: randomNumber(),
    direccion: randomString(),
    ciudad: randomString(),
  },
  notMandatory: {
    codigopostal: randomNumber(),
    pais: "Chile",
    profesion: "QA Automation",
    intereses: "Nature",
  },
};

export default formValues;
