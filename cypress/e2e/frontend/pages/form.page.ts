import normalizeText from "../../../../global/helpers/normalize-text";

class FormChallenge {
  get = {
    formLabels: () => cy.get(".space-y-2").find("label"),
    successMessage: () => cy.contains("h2", "¡Registro exitoso!"),
  };

  // Private function to populate mandatory * and optional input fields
  private fillFields(isMandatory: boolean, values: Record<string, any>) {
    this.get
      .formLabels()
      // True are mandatory and false optionals
      .filter((index, label) => isMandatory === label.innerText.includes("*"))
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          .then(($input) => {
            const fieldName = normalizeText($label.text()); // Helper function for cleans special characters from labels
            if (values[fieldName]) {
              cy.wrap($input).clear().type(values[fieldName]); //Type values in input fields
            }
          });
      });
  }

  // Public function to fill mandatory (*) fields
  fillMandatoryFields(values: Record<string, any>) {
    this.fillFields(true, values);
  }

  // Public function to fill non-mandatory fields
  fillNotMandatoryFields(values: Record<string, any>) {
    this.fillFields(false, values);
  }
  // Verifies form submission by locating the success label
  verifyFormSubmission() {
    cy.contains("button", "Enviar Registro").click();
    this.get
      .successMessage()
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .should("include", "¡Registro exitoso!") // Use Cypress assertion instead of throw error
      .then(() => {
        cy.log("The form has been successfully submitted.");
      });
  }

  // Validates input fields follow expected value types
  areInputsValid(values: Record<string, any>) {
    const invalidFields: string[] = [];

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
                    ` - ${fieldName}: Invalid value (must be a string)`
                  );
                }
                break;
              case "email":
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(inputValue)) {
                  invalidFields.push(` - ${fieldName}: Invalid email format`);
                }
                break;
              case "telefono":
                const phoneRegex = /^\+?\d{8,15}$/;
                if (!phoneRegex.test(inputValue)) {
                  invalidFields.push(
                    ` - ${fieldName}: Invalid phone number (should be 8-15 digits)`
                  );
                }
                break;
            }
          });
      })
      .then(() => {
        // Prints an error if invalidFields contain validation errors
        if (invalidFields.length > 0) {
          cy.log("Inputs fields contains invalid data ");
          // Use `.join()` to convert the array into a readable string format.
          cy.log("Invalid fields detected: " + invalidFields.join("\n"));
        }
      });
  }
}

export const formChallenge = new FormChallenge();
