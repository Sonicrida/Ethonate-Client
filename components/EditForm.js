import { Box, Heading, Button, FormField, TextInput } from "grommet";
import { Formik } from "formik";
import Router from "next/router";

const EditForm = ({ props }) => {
  return (
    <Box
      margin="medium"
      width="large"
      elevation="medium"
      pad="medium"
      round="medium"
    >
      <Heading level="2">Edit Page</Heading>
      <Formik
        initialValues={{
          name: props.name,
          username: props.username,
          address: props.address,
          description: props.description,
          passphrase: props.passphrase
        }}
        validate={values => {
          const errors = {};
          if (!values.address) {
            errors.address = "required";
          }
          if (!values.name) {
            errors.name = "required";
          }
          if (!values.username) {
            errors.username = "required";
          }
          if (!values.description) {
            errors.description = "required";
          }
          if (!values.passphrase) {
            errors.passphrase = "required";
          }

          return errors;
        }}
        onSubmit={body => {
          fetch("https://ethonate.com/update", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
              "content-type": "application/json"
            }
          })
            .then(response => response.json())
            .then(
              res => {
                console.log(res);
                if (res.success) {
                  Router.push("/profile/" + body.username);
                  // console.log(res.updateCode);
                }
              },
              error => {
                console.log(error);
              }
            );
        }}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={event => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <FormField label="Address" error={errors.address}>
              <TextInput
                name="address"
                value={values.address || ""}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Name" error={errors.name}>
              <TextInput
                name="name"
                value={values.name || ""}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Username" error={errors.username}>
              <TextInput
                name="username"
                value={values.username || ""}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Description" error={errors.description}>
              <TextInput
                name="description"
                value={values.description || ""}
                onChange={handleChange}
              />
            </FormField>
            <FormField label="Passphrase" error={errors.passphrase}>
              <TextInput
                name="passphrase"
                value={values.passphrase || ""}
                onChange={handleChange}
              />
            </FormField>

            <Box
              tag="footer"
              margin={{ top: "medium" }}
              direction="row"
              justify="between"
            >
              <Button label="Cancel" />
              <Button type="submit" primary label="Create" />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditForm;
