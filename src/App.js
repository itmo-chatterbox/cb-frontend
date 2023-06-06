import * as React from 'react';

import {UserContext, userCurrentInfo} from './utils/users';
import {useEffect, useState} from 'react';
import {
	Loading,
	NextUIProvider,
	Row,
	Spacer,
} from '@nextui-org/react';
import Header from './components/header';
import {RouterComponent} from './utils/router';

export default function App() {

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		let user = userCurrentInfo().then(res => {
			setUser(res);
		}).finally(() => {
			setIsLoading(false);
		}).catch((e) => {
			console.log(e)
		})

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

			{!isLoading &&
				<UserContext.Provider value={{user, setUser}}>
					<Header/>

					<Spacer/>

					<RouterComponent/>
				</UserContext.Provider>
			}


		</NextUIProvider>

	);
}