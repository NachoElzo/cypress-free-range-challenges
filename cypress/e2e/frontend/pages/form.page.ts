import normalizeText from "../../../../global/helpers/normalize-text";

class FormChallenge {
  get = {
    formLabels: () => cy.get(".space-y-2").find("label"),
    successMessage: () => cy.contains("h2", "¡Registro exitoso!"),
  };

  fillMandatoryFields(values: object) {
    this.get
      .formLabels()
      .filter((index, label) => label.innerText.includes("*"))
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          .then(($input) => {
            const fieldName = normalizeText($label.text());
            if (values[fieldName]) {
              cy.wrap($input).clear().type(values[fieldName]);
            }
          });
      });
  }

  fillNotMandatoryFields(values: object) {
    this.get
      .formLabels()
      .filter((index, label) => !label.innerText.includes("*"))
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          .then(($input) => {
            const fieldName = normalizeText($label.text());
            if (values[fieldName]) {
              cy.wrap($input).clear().type(values[fieldName]);
            }
          });
      });
  }

  verifyFormSubmission() {
    cy.contains("button", "Enviar Registro").click();
    this.get
      .successMessage()
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .then((messageText) => {
        if (!messageText.includes("¡Registro exitoso!")) {
          throw new Error(
            "There was an issue with your form inputs: Unexpected success message."
          );
        }
        cy.log("The form has been successfully submitted.");
      });
  }
}

export const formChallenge = new FormChallenge();
