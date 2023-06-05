import fullLogo from '../images/full-logo.svg';
import {Link, Navbar, User} from '@nextui-org/react';
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
                        {/*{*/}
                        {/*	Links.map(link => (*/}
                        {/*		<Navbar.Link*/}
                        {/*			href={link.url}>{link.name}</Navbar.Link>*/}
                        {/*	))*/}
                        {/*}*/}

                        <Link href={"/"}>
                            <User src={`${user?.photo_url}`}
                                  name={`${user?.first_name} ${user?.last_name}`}/>
                        </Link>

                    </Navbar.Content>

                }
            </Navbar>
            }
        </UserContext.Consumer>

    );
}