class FormChallenge {
  get = {
    formLabels: () => cy.get(".space-y-2").find("label"),
  };

  fillForm(values) {
    this.get
      .formLabels()
      .filter((index, label) => label.innerText.includes("*"))
      .each(($label) => {
        cy.wrap($label)
          .parent()
          .find("input")
          .then(($input) => {
            const fieldName = $label
              .text()
              .normalize("NFD") // Decomposes characters to separate accents (e.g., 'é' → 'e´')
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
}

export const formChallenge = new FormChallenge();
