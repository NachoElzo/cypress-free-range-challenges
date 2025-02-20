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
    const invalidFields = []; // Arreglo para almacenar los errores

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
              cy.wrap($input).should("have.value", inputValue); // Verifica que el campo tenga el valor esperado
            }

            // Validación con switch case
            switch (fieldName) {
              case "nombre":
                if (typeof inputValue !== "string" || inputValue.length < 3) {
                  invalidFields.push(
                    `Nombre (field: "${fieldName}"): Invalid value (must be a string with at least 3 characters)`
                  );
                }
                break;
              case "apellido":
                if (typeof inputValue !== "string" || inputValue.length < 3) {
                  invalidFields.push(
                    `Apellido (field: "${fieldName}"): Invalid value (must be a string with at least 3 characters)`
                  );
                }
                break;
              case "email":
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(inputValue)) {
                  invalidFields.push(
                    `Email (field: "${fieldName}"): Invalid email format`
                  );
                }
                break;
              case "telefono":
                const phoneRegex = /^\+?\d{10,15}$/;
                if (!phoneRegex.test(inputValue)) {
                  invalidFields.push(
                    `Telefono (field: "${fieldName}"): Invalid phone number (should be 10-15 digits)`
                  );
                }
                break;
              case "direccion":
                if (typeof inputValue !== "string" || inputValue.length < 5) {
                  invalidFields.push(
                    `Direccion (field: "${fieldName}"): Invalid value (must be a string with at least 5 characters)`
                  );
                }
                break;
              // Agrega más casos según sea necesario

              default:
                break;
            }
          });
      })
      .then(() => {
        // Imprimir los errores al final, si los hay
        if (invalidFields.length > 0) {
          cy.log("Invalid fields detected: ", invalidFields);
          // Lanzar un error para fallar el test
          throw new Error(
            `Test failed due to invalid fields: ${invalidFields.join(", ")}`
          );
        } else {
          cy.log("All fields are valid.");
        }
      });
  }
}

export const formChallenge = new FormChallenge();
