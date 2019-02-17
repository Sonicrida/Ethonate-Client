import { Box, Heading, Text, Collapsible, Button } from "grommet";
import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";

const Profile = withRouter(props => {
  const [phraseDisplay, setPhraseDisplay] = useState(true);

  return (
    <Box align="center">
      <Box
        margin="large"
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
      </Box>
      <Collapsible open={phraseDisplay}>
        {props.passphrase && (
          <Box elevation="medium" pad="medium" round="medium">
            Passphrase
            <Button onClick={() => setPhraseDisplay(false)} label="Close" />
          </Box>
        )}
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
