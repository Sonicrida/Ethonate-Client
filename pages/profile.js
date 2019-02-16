import { Box, Heading, Text } from "grommet";
import React from "react";

const Profile = () => (
  <Box align="center">
    <Box margin="large" elevation="medium" pad="medium" round="medium">
      <Heading margin={{ top: "0" }}>
        John Doe
        <br />
        <small>john</small>
      </Heading>
      <Text>0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520</Text>
    </Box>
  </Box>
);

export default Profile;
