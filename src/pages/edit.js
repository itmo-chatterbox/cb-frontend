import {
	editMainData,
	editPassword,
	UserContext,
	userCurrentInfo,
} from '../utils/users';
import {
	Button,
	Card,
	Col,
	Input,
	Link,
	Loading,
	Row,
	Spacer,
	Text,
	Textarea,
} from '@nextui-org/react';
import {useEffect, useState} from 'react';
import * as React from 'react';
import {Layout} from '../layout/layout';

export const EditPage = () => {

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [about, setAbout] = useState(null);
	const [password, setPassword] = useState(null);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		userCurrentInfo().then(res => {
			setFirstName(res?.first_name);
			setLastName(res?.last_name);
			setEmail(res?.email);
			setAbout(res?.about);

			setIsLoading(false);
		});
	}, []);

	return (
		<UserContext.Consumer>
			{({user, setUser}) => {

				return (
					<>
						<Layout>
							<h3>Редактирование профиля</h3>
							{
								isLoading && <Row justify={'center'} css={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									minHeight: '100vh',
									background: 'white',
									zIndex: '1',
								}} align="center">
									<Loading type={'points'}/>
								</Row>
							}


							<Card variant={'bordered'}>
								<Card.Header>
									Основные сведения
								</Card.Header>
								<Card.Divider/>
								<Card.Body>
									<Input label={'Имя'}
										   initialValue={firstName}
										   onChange={(e) => {
											   setFirstName(e.target.value);
										   }}/>
									<Input label={'Фамилия'}
										   initialValue={lastName}
										   onChange={(e) => {
											   setLastName(e.target.value);
										   }}/>
									<Input label={'Электронная почта'}
										   initialValue={email}
										   onChange={(e) => {
											   setEmail(e.target.value);
										   }}/>
									<Textarea label={'Обо мне'}
											  initialValue={about}
											  onChange={(e) => {
												  setAbout(e.target.value);
											  }}/>
									<Spacer/>
									<Link>
										<Button color={'primary'} flat
												onClick={async (e) => {
													setIsLoading(true);

													editMainData(firstName, lastName, email, about).then(res => {
														setUser(res);
													}).finally(() => {
														setIsLoading(false);
													});
												}}>Сохранить</Button>
									</Link>
								</Card.Body>
							</Card>
							<Spacer/>
							<Card variant={'bordered'}>
								<Card.Header>
									Изменение пароля
								</Card.Header>
								<Card.Divider/>
								<Card.Body>
									<Input label={'Новый пароль'}
										   type={'password'} onChange={(e) => {
										setPassword(e.target.value);
									}}></Input>
									<Spacer/>
									<Link>
										<Button color={'primary'} flat
												onClick={async (e) => {
													setIsLoading(true);
													editPassword(password).then(res => {
														setUser(res);
													}).finally(() => {
														setIsLoading(false);
													});
												}}>Изменить</Button>
									</Link>
								</Card.Body>
							</Card>
							<Spacer/>
							{/*<Card variant={"bordered"}>*/}
							{/*    <Card.Header>*/}
							{/*        Удаление аккаунта*/}
							{/*    </Card.Header>*/}
							{/*    <Card.Divider/>*/}
							{/*    <Card.Body>*/}
							{/*        <Text>При нажатии на кнопку Удалить, произойдет полное удаление информации о текущем*/}
							{/*            пользователе.</Text>*/}
							{/*        <Spacer/>*/}
							{/*        <Link>*/}
							{/*            <Button color={"error"} flat disabled={true}>Удалите мой аккаунт</Button>*/}
							{/*        </Link>*/}
							{/*    </Card.Body>*/}
							{/*</Card>*/}
						</Layout>

					</>
				);
			}}
		</UserContext.Consumer>
	);
};
