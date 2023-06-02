import {Button, Input, Modal, Text} from '@nextui-org/react';
import {useState} from 'react';

import {userCurrentInfo, userLogin} from '../../utils/users';

export const LoginModal = ({isLoginOpen, setIsLoginOpen, setUser}) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	return (
		<>
			<Modal
				closeButton
				blur
				aria-labelledby="modal-title"
				open={isLoginOpen}
				onClose={setIsLoginOpen}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Log in to &nbsp;
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
						placeholder="Password"
						contentLeft="🔑"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={() => {
						setIsLoginOpen(false);
					}
					}>
						Close
					</Button>
					<Button auto onPress={async () => {
						let user = await userLogin(email, password);
						setUser(user);
					}}>
						Sign in
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};