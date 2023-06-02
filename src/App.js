import * as React from 'react';

import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import {UserContext, userCurrentInfo} from './utils/users';
import {WelcomePage} from './pages/welcome';
import {useEffect, useState} from 'react';
import {
	Card,
	Container,
	Grid,
	Loading,
	NextUIProvider,
	Row,
	Spacer,
} from '@nextui-org/react';
import Header from './components/header';
import {ProfilePage} from './pages/profile';
import {Sidebar} from './components/sidebar';

const router = createBrowserRouter([
	{path: '/',  element: <ProfilePage myPage={true}/>},
	{path: '/id/:id', element: <ProfilePage/>},
]);

export default function App() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		let user = userCurrentInfo().then(res => {
			setUser(res);
			setIsLoading(false);
		}).catch(err => {
			setIsLoading(false);
		});

	}, []);

	return (
		<NextUIProvider>
			{isLoading && <Row justify={'center'} css={{
				position: 'absolute',
				top: 0,
				bottom: 0,
				minHeight: '100vh',
				background: 'white',
			}} align="center">
				<Loading type={'points'}/>
			</Row>
			}

			{!isLoading && <UserContext.Provider value={{user, setUser}}>
				<Header/>

				<Spacer />

				{user &&

					<Container lg>

						<Grid.Container gap={2}>
							<Grid xs={12} sm={3}>
								<Card>
									<Card.Body>
										<Sidebar/>
									</Card.Body>
								</Card>
							</Grid>
							<Grid xs={12} sm={9}>
								<Card>
									<Card.Body>
										<RouterProvider router={router}/>
									</Card.Body>
								</Card>
							</Grid>

						</Grid.Container>
					</Container>
				}
				{!user && <WelcomePage/>}
			</UserContext.Provider>
			}


		</NextUIProvider>

		//
		// 	<Container fluid>
		// 		<Header/>
		// 		<Grid.Container>
		// 			<Grid xs={4}>
		// 				Регистрация
		// 			</Grid>
		// 			<Grid xs={4}>
		// 				Регистрация
		// 			</Grid>
		// 			<Grid xs={4}>
		// 				Регистрация
		// 			</Grid>
		// 		</Grid.Container>
		// 	</Container>
		//
	);
}