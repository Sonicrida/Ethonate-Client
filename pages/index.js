import React, { Component } from 'react';
import { Formik } from 'formik';
import { grommet, Box, Button, Grommet, FormField, Heading, Select, TextArea, TextInput } from 'grommet';

class Home extends Component {
	state = { submitted: false };

	render() {
		const { submitted } = this.state;
		return (
			<div>
				<Grommet theme={grommet}>
					<Box align="center">
						<Box margin="large" elevation="medium" pad="medium" round="medium">
							<Heading
								margin={{
									top: '0'
								}}
							>
								Create A Donation Page
							</Heading>
							<Formik
								validate={values => {
									const errors = {};
									if (!values.address) {
										errors.address = 'required';
									}
									if (!values.name) {
										errors.name = 'required';
									}
									if (!values.username) {
										errors.username = 'required';
									}

									return errors;
								}}
								validateOnBlur={submitted}
								validateOnChange={submitted}
								onSubmit={(values, { setSubmitting }) => {
									alert('Submitting\n' + JSON.stringify(values, null, 2));
									setSubmitting();
								}}
							>
								{({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
									<form
										onSubmit={event => {
											event.preventDefault();
											this.setState({ submitted: true });
											handleSubmit();
										}}
									>
										<FormField label="Address" error={errors.address}>
											<TextInput
												name="address"
												value={values.address || ''}
												onChange={handleChange}
											/>
										</FormField>
										<FormField label="Name" error={errors.name}>
											<TextInput name="name" value={values.name || ''} onChange={handleChange} />
										</FormField>
										<FormField label="Username" error={errors.username}>
											<TextInput
												name="username"
												value={values.username || ''}
												onChange={handleChange}
											/>
										</FormField>

										<Box tag="footer" margin={{ top: 'medium' }} direction="row" justify="between">
											<Button label="Cancel" />
											<Button type="submit" primary label="Create" />
										</Box>
									</form>
								)}
							</Formik>
						</Box>
					</Box>
				</Grommet>
			</div>
		);
	}
}

export default Home;
