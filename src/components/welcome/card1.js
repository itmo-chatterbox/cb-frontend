import {Card, Col, Row, Button, Text} from '@nextui-org/react';
import shortLogo from '../../images/short-logo.svg';
import {UserContext} from '../../utils/users';
import {useState} from 'react';
import {LoginModal} from './login-modal';
import {SignupModal} from './signup-modal';

export const Card1 = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);

	return (
		<>
			<UserContext.Consumer>
				{({user, setUser}) => (
					<>
						<LoginModal isLoginOpen={isLoginOpen}
									setIsLoginOpen={setIsLoginOpen}
									setUser={setUser}/>

						<SignupModal isSignupOpen={isSignupOpen}
									 setIsSignupOpen={setIsSignupOpen}
									 setUser={setUser} />

						<Card css={{p: '$6'}}>
							<Card.Header>
								<Row align={'center'} gap={2}>
									<img src={shortLogo} alt={'/..'}/>
									<Col>
										<Text h4 css={{lineHeight: '$xs'}}>
											Welcome to ChatterBox!
										</Text>

										<Text css={{color: '$accents8'}}>Hi
											there!</Text>
									</Col>
								</Row>
							</Card.Header>
							<Card.Divider/>
							<Card.Body>
								<Text>
									Start chatting with your friends right now
								</Text>
							</Card.Body>

							<Card.Footer>
								<Row justify="flex-end" gap={2}>
									<Button size="sm" light onClick={() => {
										setIsLoginOpen(true);
									}}>
										Login
									</Button>
									<Button size="sm" color="secondary"
											onClick={() => {
												setIsSignupOpen(true);
											}}>
										Sign up
									</Button>
								</Row>
							</Card.Footer>
						</Card>
					</>
				)}
			</UserContext.Consumer>
		</>
	)
		;

};
