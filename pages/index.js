import React from "react";
import { Formik } from "formik";
import { Box, Button, FormField, Heading, TextInput } from "grommet";
import Router from "next/router";

const Home = () => (
  <Box align="center">
    <Box margin="large" elevation="medium" pad="medium" round="medium">
      <Heading
        margin={{
          top: "0"
        }}
      >
        Create A Donation Page
      </Heading>
      <Formik
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

          return errors;
        }}
        onSubmit={body => {
          fetch("http://68.183.170.113:8080/insert", {
            method: "POST",
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
                  localStorage.setItem("username", body.username);
                  localStorage.setItem("passphrase", res.updateCode);
                  Router.push("/profile/" + body.username);
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
  </Box>
);

export default Home;
