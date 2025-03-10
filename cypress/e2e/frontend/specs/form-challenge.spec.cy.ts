import urls from "../../../../global/data/urls";
import {
  formValues,
  invalidValues,
} from "../../../../global/data/form-input-values";
import { formChallenge } from "../pages/form.page";

describe("Validating inputs values from the form page", () => {
  beforeEach(() => {
    cy.visit(urls.ui.formChallenge);
  });
  it("Validates that user inputs match the required data types", () => {
    formChallenge.fillMandatoryFields(invalidValues.invalidMandatory);
    formChallenge.fillNotMandatoryFields(invalidValues.invalidNotMandatory);
    formChallenge.areInputsValid(formValues);
  });
  it("Users can successfully submit the form when all fields are filled", () => {
    formChallenge.fillMandatoryFields(formValues.mandatory);
    formChallenge.fillNotMandatoryFields(formValues.notMandatory);
    formChallenge.verifyFormSubmission();
  });
  it("Users can successfully submit the form with only mandatory fields filled", () => {
    formChallenge.fillMandatoryFields(formValues.mandatory);
    formChallenge.verifyFormSubmission();
  });
});
