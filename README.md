# Free range tester challenges

## Challenge 1 - form inputs values validations

[spec]`form-challenge.spec.cy.ts`

### requirements:

- Fields with an asterisk are mandatory
- Fields without an asterisk are not mandatory
- The form cannot be submitted with mandatory fields left empty
- The form can be submitted with non-mandatory fields left empty
- Fields must follow the required data format (e.g., an email must have a valid email format, a phone number cannot contain letters)
- If there is an issue, an error message will be displayed on the respective field
- If everything is correct, a success message will be shown

### Issues:

test case `Users can successfully submit the form with only mandatory fields filled` is failing

- Issue: Form can not be sent with not required fields filled

test case `Validates that user inputs match the required data types` is failing

- Issue: Invalid data types are being accepted in form inputs
