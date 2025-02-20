import urls from "../../../../global/data/urls";
import formValues from "../../../../global/data/form-input-values";
import { formChallenge } from "../pages/form.page";

describe("Validating users inputs valaues", () => {
  beforeEach(() => {
    cy.visit(`${urls.ui.formChallenge}`);
  });
  it("Validating Mandatory fields", () => {
    formChallenge.fillForm(formValues.mandatory);
    formChallenge.mandatoryFieldsVerification();
  });
});
