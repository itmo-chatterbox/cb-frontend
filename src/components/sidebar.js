import {Button, Col, Container, Divider, Link, Spacer} from '@nextui-org/react';
import {UserContext, userLogout} from '../utils/users';

export const Sidebar = () => {
		return (
			<>
				<UserContext.Consumer>
					{({user, setUser}) => (
						<Col>
							<a href={'/'}>
								<Button css={{width: '100%'}} color="primary" flat>
									My profile
								</Button>
							</a>


							<Spacer/>

							<Button css={{width: '100%'}} light color="primary">
								ФрендЫ
							</Button>
							<Spacer/>

							<a href={'/me'}>
								<Button css={{width: '100%'}} color="primary" flat>
									Messenger
								</Button>
							</a>


							<Spacer/>


							<Divider/>
							<Spacer/>
							<Button css={{width: '100%'}} light color="error"
									onClick={async () => {
										let result = await userLogout();
										setUser(null);
									}}>
								Выход
							</Button>
						</Col>

					)}

				</UserContext.Consumer>

			</>
		)
			;
	}
;
;
;
