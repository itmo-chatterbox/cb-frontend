import fullLogo from '../images/full-logo.svg';
import {Link, Navbar, User} from '@nextui-org/react';
import {noPhotoURL, UserContext} from '../utils/users';
import {BASE_URL} from "../utils/config";

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
                            <User src={`${BASE_URL + user?.photo_url || noPhotoURL}`}
                                  name={`${user?.first_name} ${user?.last_name}`}/>
                        </Link>

                    </Navbar.Content>

                }
            </Navbar>
            }
        </UserContext.Consumer>

    );
}