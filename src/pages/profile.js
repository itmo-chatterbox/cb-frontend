import {redirect, useParams} from 'react-router-dom';
import {editStatus, getUserInfo, userCurrentInfo} from '../utils/users';
import {useEffect, useState} from 'react';
import {
	Card,
	Col,
	Grid,
	Image,
	Row,
	Text,
	Badge,
	Tooltip,
	Divider,
	Button,
	Input,
	Spacer,
	Loading, Avatar, User, Dropdown, Textarea,
} from '@nextui-org/react';
import {RiCheckboxCircleFill} from 'react-icons/ri';
import {Layout} from '../layout/layout';
import {RxDot, RxDotsHorizontal} from 'react-icons/rx';

export const ProfilePage = () => {

	const {id} = useParams();

	const [myPage, setMyPage] = useState(false);
	const [pageId, setPageId] = useState(id);

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [status, setStatus] = useState(null);
	const [isVerified, setIsVerified] = useState(false);
	const [about, setAbout] = useState(null);

	const [isStatusLoading, setIsStatusLoading] = useState(false);

	useEffect(() => {
		userCurrentInfo().then(res => {
			if (!pageId) {
				setPageId(res.id);
				setMyPage(true);
				return;
			}

			if (pageId == res.id) {
				setMyPage(true);
			}
		});

		if (pageId) {
			getUserInfo(pageId).then(res => {
				if (!res?.id) {
					userCurrentInfo().then(res => {
						setPageId(res?.id);
					});
				}

				setFirstName(res?.first_name);
				setLastName(res?.last_name);
				setPhoto(res?.photo_url);
				setStatus(res?.status);
				setIsVerified(res?.is_verified);
				setAbout(res?.about || 'Человек');
			});
		}

	}, [pageId]);

	const [posts, setPosts] = useState([{
		title: 'How to become a president of USA?',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus. Feugiat vivamus at augue eget arcu dictum varius duis at. Orci nulla pellentesque dignissim enim sit amet venenatis. Lectus nulla at volutpat diam ut venenatis tellus in metus. Tellus in metus vulputate eu scelerisque felis imperdiet. Eget dolor morbi non arcu. Lobortis elementum nibh tellus molestie nunc non. Rhoncus urna neque viverra justo nec ultrices dui sapien.',
		date: '25.10.2018',
	}]);

	return (<>
		<Layout>
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Col>
						<Card variant={'bordered'}>
							<Image src={photo}/>
						</Card>
						<Spacer/>
						{myPage && <a href={'/edit'}>
							<Button css={{width: '100%'}} flat>
								Edit
							</Button>
						</a>}

					</Col>

				</Grid>
				<Grid xs={12} sm={8}>
					<Col gap={2}>
						<Row align={'center'}>
							<Row align={'baseline'}>
								<Text
									h3>{firstName} {lastName}</Text> &nbsp;
								{isVerified && <Tooltip
									content={`Person ${firstName} ${lastName} is verified`}>
									<RiCheckboxCircleFill
										fill={'#a29bfe'}/>
								</Tooltip>}
							</Row>
						</Row>

						<Spacer/>

						{

							myPage ? (<Input initialValue={status}
											 labelPlaceholder="Your status"
											 onChange={(e) => {
												 setIsStatusLoading(true);
												 let status = e.target.value;
												 editStatus(status).finally(() => {
													 setIsStatusLoading(false);
												 });
											 }}
											 contentRight={isStatusLoading ?
												 <Loading
													 size="xs"/> : null}
											 css={{width: '100%'}}/>) :
								<Text h5 css={{
									color: '#888', fontWeight: '$light',
								}}>{status}</Text>

						}


						<Divider css={{m: '$6'}}/>

						<Card variant={'bordered'}>
							<Card.Header>
								<Text css={{fontWeight: 'bold'}}>
									Hello, that's me!
								</Text>
							</Card.Header>
							<Card.Divider/>
							<Card.Body>
								{about}
							</Card.Body>
						</Card>
					</Col>
				</Grid>
			</Grid.Container>
			<Spacer/>
			<Card variant={'bordered'}>
				<Card.Header>
					<Text h4 css={{m: 0}}>Moments</Text>
				</Card.Header>
				<Card.Divider/>
				<Card.Body>
					<Card variant={'bordered'}>
						<Card.Header>
							<Text h5 css={{m: 0}}>Share your moments</Text>

						</Card.Header>
						<Card.Divider />

						<Card.Body>
							<Input placeholder={"Name your moment"}/>
							<Spacer />
							<Textarea placeholder={"Share your moment"} minRows={4} />
						</Card.Body>
						<Card.Divider />
						<Card.Footer>
							<Button flat>
								Fix this moment ✨
							</Button>
						</Card.Footer>
					</Card>

					{posts.map(post => (
						<>
							<Spacer />
							<Card variant={'bordered'}>
								<Card.Header>
									<Row justify={'space-between'}>
										<Row align={'center'}>
											<User name={'Joe Bieden'}
												  description={post.date}></User>
											<Spacer/>
											<Text h5
												  css={{m: 0}}>{post.title}</Text>
										</Row>

										{myPage &&
											<Dropdown>
												<Dropdown.Button flat
																 color={'secondary'}><RxDotsHorizontal/></Dropdown.Button>
												<Dropdown.Menu>
													<Dropdown.Item key="pin">Pin
														post</Dropdown.Item>
													<Dropdown.Item key="delete"
																   withDivider={true}
																   color={'error'}>Delete
														post</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>}

									</Row>

								</Card.Header>
								<Card.Divider/>
								<Card.Body>
									{post.text}
								</Card.Body>
							</Card>
						</>

					))}
				</Card.Body>
			</Card>
		</Layout>

	</>);
};
