import { Box, Heading, Text } from "grommet";
import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";

const Profile = withRouter(props => (
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
  </Box>
));

Profile.getInitialProps = async function({ query }) {
  const res = await fetch("http://68.183.170.113:8080/data/" + query.username);
  const data = await res.json();
  console.log(data);
  if (!data.success) {
    return { name: "Profile Not Found" };
  }
  const { name, address, username, description } = data.data;

  return {
    name,
    address,
    username,
    description
  };
};

export default Profile;
