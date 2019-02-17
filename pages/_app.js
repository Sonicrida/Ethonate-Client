import App, { Container } from 'next/app';
import React from 'react';
import { Grommet } from 'grommet';

const theme = {
	global: {
		colors: {
			brand: '#228BE6'
		},
		font: {
			family: 'Open Sans',
			size: '16px',
			height: '20px'
		}
	}
};

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Grommet full theme={theme}>
					<Component {...pageProps} />
				</Grommet>
			</Container>
		);
	}
}

export default MyApp;
