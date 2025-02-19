import urls from "../../../../global/data/urls";
import { formChallenge } from "../pages/form.page";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(`${urls.ui.formChallenge}`);
    const formValues = {
      nombre: "Nacho",
      apellido: "Elzo",
      email: "nacho@freeRangeTester.com",
      telefono: "+34 58888987",
      direccion: "Calle",
      ciudad: "Zaragoza",
      codigopostal: "585458",
      pais: "Chile",
      profesion: "IT engineer",
      intereses: "Nature",
    };
    formChallenge.fillForm(formValues);
  });
});
