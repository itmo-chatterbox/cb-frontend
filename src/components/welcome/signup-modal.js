import {Button, Input, Modal, Text} from '@nextui-org/react';
import {useState} from 'react';

import {userCurrentInfo, userLogin, userSignup} from '../../utils/users';

export const SignupModal = ({isSignupOpen, setIsSignupOpen, setUser}) => {
	const [email, setEmail] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [birthDate, setbirthDate] = useState(null);
	const [password, setPassword] = useState(null);

	return (
		<>
			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={isSignupOpen}
				onClose={setIsSignupOpen}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Welcome to &nbsp;
						<Text b size={18}>
							ChatterBox
						</Text>
					</Text>
				</Modal.Header>

				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Email"
						contentLeft="✉"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>

					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="First Name"
						contentLeft="✉"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>

					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Last Name"
						contentLeft="✉"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>

					<Input
						label="Date"
						type="date"
						onChange={(e) => {
							setbirthDate(e.target.value);
						}}
					/>

					<Input
						clearable
						bordered
						fullWidth
						color="primary"
						size="lg"
						placeholder="Password"
						contentLeft="🔑"
						type={'password'}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>


				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={() => {
						setIsSignupOpen(false);
					}
					}>
						Close
					</Button>
					<Button auto onPress={async () => {
						let user = await userSignup(email, firstName, lastName, birthDate, password);
						setUser(user);
					}}>
						Sign in
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};