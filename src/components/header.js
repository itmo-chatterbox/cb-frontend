import fullLogo from '../images/full-logo.svg';
import {Navbar, User} from '@nextui-org/react';
import {UserContext} from '../utils/users';

const Links = [
	{
		name: 'Главная',
		url: '/',
	},
	{
		name: 'Сообщения',
		url: '/me',
	},
];
export default function Header() {
	return (
		<UserContext.Consumer>
			{({user, setUser}) => <Navbar variant={'sticky'}>
					<Navbar.Brand>
						<img src={fullLogo} alt={'Chatterbox'}/>
					</Navbar.Brand>

					{user &&
						<Navbar.Content>
							{
								Links.map(link => (
									<Navbar.Link
										href={link.url}>{link.name}</Navbar.Link>
								))
							}

							<User src={"https://sun6-22.userapi.com/s/v1/if1/isQAevkP11fznTwf0sqUTm4dnkk3Cl1YwMgrcY2gYtn5n5DKr8JtLPi1aP9MJru4HE6kFYAX.jpg?size=597x597&quality=96&crop=100,0,597,597&ava=1"}
								name={`${user?.first_name} ${user?.last_name}`}/>
						</Navbar.Content>

					}
				</Navbar>
			}
		</UserContext.Consumer>

	);
}