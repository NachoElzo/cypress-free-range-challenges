import normalizeText from "../../../../global/helpers/normalize-text";

class FormChallenge {
  get = {
    formLabels: () => cy.get(".space-y-2").find("label"),
    successMessage: () => cy.contains("h2", "¡Registro exitoso!"),
  };

  private fillFields(isMandatory: boolean, values: Record<string, any>) {
    this.get
      .formLabels()
      .filter((index, label) => isMandatory === label.innerText.includes("*"))
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

  // Public function to fill mandatory fields
  fillMandatoryFields(values: Record<string, any>) {
    this.fillFields(true, values);
  }

  // Public function to fill non-mandatory fields
  fillNotMandatoryFields(values: Record<string, any>) {
    this.fillFields(false, values);
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
          throw new Error("Form error: Invalid input fields.");
        }
        cy.log("The form has been successfully submitted.");
      });
  }

  areInputsValid(values: Record<string, any>) {
    const invalidFields: string[] = []; // Explicitly defining the type as string[]

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
              cy.wrap($input).should("have.value", inputValue); // Verifies that the input has the expected value
            }
            // Switch case to validate input rules
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
                const phoneRegex = /^\+?\d{8,15}$/;
                if (!phoneRegex.test(inputValue)) {
                  invalidFields.push(
                    `${fieldName}: Invalid phone number (should be 8-15 digits)`
                  );
                }
                break;
            }
          });
      })
      .then(() => {
        // Prints all the errors stored in console
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
