import {Button, Col, Container, Divider, Spacer} from '@nextui-org/react';
import {UserContext, userLogout} from '../utils/users';

export const Sidebar = () => {
		return (
			<>
				<UserContext.Consumer>
					{({user, setUser}) => (
						<Col>
							<Button css={{width: '100%'}} flat>
								Моя страница
							</Button>
							<Spacer/>

							<Button css={{width: '100%'}} light color="primary">
								ФрендЫ
							</Button>
							<Spacer/>

							<Button css={{width: '100%'}} light color="primary">
								Телеграф
							</Button>
							<Spacer/>


							<Divider/>
							<Spacer/>
							<Button css={{width: '100%'}} light color="error"
									onClick={async () => {
										let result = await userLogout();
										setUser(null)
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
