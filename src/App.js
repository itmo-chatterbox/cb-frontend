import * as React from 'react';

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
import {Sidebar} from './components/sidebar';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";


// const router = createBrowserRouter([
// 	{path: '/',  element: <ProfilePage />},
// 	{path: '/id/:id', element: <ProfilePage />},
// 	{path: '/edit', element: <EditPage />}
// ]);

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

                    <Spacer/>

                    <Switch>
                        <Route path={"/"}>
                            <WelcomePage/> 
                        </Route>
                    </Switch>
                </UserContext.Provider>
                }


        </NextUIProvider>


    );
}