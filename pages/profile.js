import { Box, Heading, Text, Collapsible, Button } from "grommet";
import React, { useState } from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import EditForm from "../components/EditForm";
import Link from "next/link";

const Profile = withRouter(props => {
  const [phraseDisplay, setPhraseDisplay] = useState(true);
  const [editMode, setEditMode] = useState(false);

  return (
    <Box align="center">
      <Box width="large" pad="small" align="end" margin="none" direction="row">
        <Link href="/">
          <Button label="Create" />
        </Link>
        <Button label="Edit" onClick={() => setEditMode(!editMode)} />
      </Box>
      <Box
        margin="medium"
        width="large"
        elevation="medium"
        pad="medium"
        round="medium"
      >
        <Heading margin={{ top: "0" }}>
          {props.name}
          <br />
          <small>{props.username}</small>
        </Heading>
        <Text>{props.address}</Text>
        <p>{props.description}</p>
        <Button
          primary
          alignSelf="center"
          href={`https://www.mycrypto.com/?to=${
            props.address
          }#send-transaction`}
          label={`Donate to ${props.name} with MyCrypto`}
        />
      </Box>
      <Collapsible open={phraseDisplay}>
        {props.passphrase && (
          <Box
            elevation="medium"
            pad="small"
            round="medium"
            gap="small"
            align="center"
            background={{
              color: "accent-1",
              dark: false,
              opacity: "strong"
            }}
          >
            <strong>Save this passphrase to edit your profile later!</strong>
            {props.passphrase}
            <Button onClick={() => setPhraseDisplay(false)} label="Close" />
          </Box>
        )}
      </Collapsible>
      <Collapsible open={editMode}>
        <EditForm props={props} />
      </Collapsible>
    </Box>
  );
});

Profile.getInitialProps = async function({ query }) {
  const res = await fetch("http://68.183.170.113:8080/data/" + query.username);
  const data = await res.json();
  if (!data.success) {
    return { name: "Profile Not Found" };
  }
  const { name, address, username, description } = data.data;
  if (process.browser) {
    if (localStorage.getItem("username") === username) {
      const passphrase = localStorage.getItem("passphrase");
      return {
        name,
        address,
        username,
        description,
        passphrase
      };
    }
  }

  return {
    name,
    address,
    username,
    description
  };
};

export default Profile;
