import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import {Redirect} from 'react-router-dom';
import {ProfilePage} from '../pages/profile';
import {EditPage} from '../pages/edit';
import {WelcomePage} from '../pages/welcome';
import * as React from 'react';
import {UserContext} from './users';
import {MessagesPage} from '../pages/messages';

export const PrivateRoute = ({children, path, ...etc}) => {
	return (
		<UserContext.Consumer>
			{({user}) => {
				return (
					<Route path={path} {...etc}>
						{!user && <Redirect to={'/login'}/>}
						{user && children}
					</Route>
				)
			}}
		</UserContext.Consumer>
	)
}

export const RouterComponent = () => {
	return (
		<UserContext.Consumer>
			{({user}) => {
				return (
					<Switch>
						<PrivateRoute path={"/id/:id"}>
							<ProfilePage />
						</PrivateRoute>

						<PrivateRoute path={"/edit"}>
							<EditPage />
						</PrivateRoute>

						<PrivateRoute path={"/me"}>
							<MessagesPage />
						</PrivateRoute>


						<Route path={'/'}>
							{user && <Redirect to={`/id/${user?.id}`}/>}
							<WelcomePage/>
						</Route>
					</Switch>
				);
			}}
		</UserContext.Consumer>

	);
};