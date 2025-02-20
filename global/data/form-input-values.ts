import {
  randomName,
  randomLastName,
  randomNumber,
  randomString,
  randomDomain,
} from "../helpers/random";

const name = randomName();
const lastName = randomLastName();

export const formValues = {
  mandatory: {
    nombre: name,
    apellido: lastName,
    email: `${name}${lastName}@${randomDomain()}`,
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

export const invalidValues = {
  invalidMandatory: {
    nombre: randomNumber(),
    apellido: randomNumber(),
    email: `${name}${lastName}${randomDomain()}`,
    telefono: randomString(),
    direccion: randomNumber(),
    ciudad: randomNumber(),
  },
  invalidNotMandatory: {
    codigopostal: randomString(),
    pais: randomNumber(),
    profesion: randomNumber(),
    intereses: randomNumber(),
  },
};
