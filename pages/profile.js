import { Box, Heading, Text } from 'grommet';
import React from 'react';
import { withRouter } from 'next/router';

const Profile = withRouter(props => (
	<Box align="center">
		<Box margin="large" elevation="medium" pad="medium" round="medium">
			<Heading margin={{ top: '0' }}>
				John Doe
				<br />
				<small>{props.router.query.username}</small>
			</Heading>
			<Text>0x4bbeEB066eD09B7AEd07bF39EEe0460DFa261520</Text>
		</Box>
	</Box>
));

export default Profile;
