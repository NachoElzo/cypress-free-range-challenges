class FormChallenge {
  get = {
    formLabels: () => cy.get(".space-y-2").find("label"),
    successMessage: () => cy.contains("h2", "¡Registro exitoso!"),
  };

  fillForm(values: object) {
    this.get
      .formLabels()
      .filter((index, label) => label.innerText.includes("*"))
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          // Normalizing the label text by removing special characters to use it as a parameter in test
          .then(($input) => {
            const fieldName = $label
              .text()
              .normalize("NFD") // removes characters to separate accents
              .replace(/\s+/g, "") // Removes all spaces from the label text
              .replace(/[^\w\s]/gi, "") // Removes special characters (excluding letters, numbers, and spaces)
              .trim()
              .toLowerCase();
            if (values[fieldName]) {
              cy.wrap($input).clear().type(values[fieldName]);
            }
          });
      });
  }
  mandatoryFieldsVerification() {
    cy.contains("button", "Enviar Registro").click();

    this.get
      .successMessage()
      .should("not.exist")
      .then((success) => {
        // If the success message (h2 label) is not visible, throw an error
        if (!success || success.length === 0) {
          throw new Error(
            "Form should be able to be sent only with required fields."
          );
        }
        // else the success message is visible
        cy.log("The form has been successfully submitted.");
      });
  }
}

export const formChallenge = new FormChallenge();
