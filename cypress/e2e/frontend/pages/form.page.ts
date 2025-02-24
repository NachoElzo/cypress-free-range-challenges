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

  areInputsValid(values: object) {
    const invalidFields = [];
    this.get
      .formLabels()
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          .then(($input) => {
            const fieldName = normalizeText($label.text());
            const inputValue = values[fieldName];

            if (inputValue) {
              cy.wrap($input).clear().type(inputValue);
              cy.wrap($input).should("have.value", inputValue); // Verifies that the input have the expected value
            }
            //Switch case to validate inputs rules
            switch (fieldName) {
              case "nombre":
              case "apellido":
              case "direccion":
              case "ciudad":
              case "codigopostal":
              case "pais":
              case "profesion":
              case "interes":
                if (typeof inputValue !== "string" || inputValue.length <= 3) {
                  invalidFields.push(
                    `${fieldName}: Invalid value (must be a string)`
                  );
                }
                break;
              case "email":
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(inputValue)) {
                  invalidFields.push(`${fieldName}: Invalid email format`);
                }
                break;
              case "telefono":
                const phoneRegex = /^\+?\d{10,15}$/;
                if (!phoneRegex.test(inputValue)) {
                  invalidFields.push(
                    `${fieldName}: Invalid phone number (should be 10-15 digits)`
                  );
                }
                break;
            }
          });
      })
      .then(() => {
        //Prints all the error stored in console
        if (invalidFields.length > 0) {
          cy.log("Invalid fields detected: ", invalidFields);
          // Throw an error to fail the test
          throw new Error(
            `Inputs fields should follow corresponding type of data:\n${invalidFields.join(
              "\n"
            )}`
          );
        } else {
          cy.log("All fields are valid.");
        }
      });
  }
}

export const formChallenge = new FormChallenge();
