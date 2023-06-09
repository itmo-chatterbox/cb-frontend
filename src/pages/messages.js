import {Layout} from '../layout/layout';
import {
	Button,
	Card,
	Col,
	Grid, Input,
	Link,
	Row,
	Spacer, styled,
	Text, Textarea,
	User,
} from '@nextui-org/react';
import {useEffect, useState} from 'react';
import {getChats, getMessages, sendMessage} from '../utils/messages';
import {RxPaperPlane} from 'react-icons/rx';
import {useParams} from "react-router-dom";

const Message = ({name, photo, date, text}) => {
	return (<Col>
		<User name={name}
			  description={date} css={{p: 0}} src={photo}/>
		<Text css={{lineHeight: '1.4em'}}>
			{text}
		</Text>
		<Spacer/>
	</Col>);
};

const SendButton = styled('button', {
	background: 'transparent',
	border: 'none',
	padding: 0,
	// styles
	width: '24px',
	margin: '0 10px',
	dflex: 'center',
	bg: '$primary',
	borderRadius: '$rounded',
	cursor: 'pointer',
	transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
	svg: {
		size: '100%',
		padding: '6px',
		transition: 'transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms',
		boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
		color: 'white',
		rotate: '-45deg',
	},
	'&:hover': {
		opacity: 0.8,
	},
	'&:active': {
		transform: 'scale(0.9)',
		svg: {
			transform: 'translate(24px, 0)',
			opacity: 0,
		},
	},
});

export const MessagesPage = () => {

	const {id} = useParams();

	const [isLoading, setIsLoading] = useState(false);
	const [chats, setChats] = useState([]);

	const [currentChat, setCurrentChat] = useState(id);
	const [messages, setMessages] = useState([]);

	const [messageToSend, setMessageToSend] = useState(null);

	async function updateChats() {
		setIsLoading(true);

		return getChats().then(res => {
			setChats(res);
		}).finally(() => {
			setIsLoading(false);
		});
	}

	async function updateMesages() {
		setIsLoading(true);

		return getMessages(currentChat).then(res => {
			setMessages(res);
		}).finally(() => {
			setIsLoading(false);
		}).catch(() => {
			setIsLoading(false);
		});
	}

	async function updateAll() {
		await updateChats()
		await updateMesages()
	}

	useEffect(() => {
		updateChats()

		setInterval(() => {
			updateAll()
		}, 1000)

	}, []);

	useEffect(() => {
		updateMesages()
	}, [currentChat]);

	return (
		<Layout>
			<Grid.Container gap={1}>
				<Grid xs={12} sm={4}>
					<Card variant={'bordered'}>
						<Card.Header>
							<Text h5 css={{m: 0}}>Your chats</Text>
						</Card.Header>
						<Card.Divider/>
						<Card.Body>
							<Col>
								{chats.map(chat => (
									<>
										<Link css={{minWidth: '100%'}} href={`/me/${chat.user_id}`}>
											<Card variant={'bordered'}>
												<Card.Body>
													<User name={chat.full_name}
														  src={chat.photo_url}></User>
												</Card.Body>
											</Card>
										</Link>
										<Spacer/>
									</>
								))}

							</Col>
						</Card.Body>
					</Card>

				</Grid>
				<Grid xs={12} sm={8}>
					<Card variant={'bordered'}>
						<Card.Header>
							<Text h5 css={{m: 0}}>Messenger</Text>
						</Card.Header>
						<Card.Divider/>
						<Card.Body>
							{!currentChat && <Text h3>Select a chat</Text>}


							{messages.map(message => {
								return (
									<Message name={message.full_name}
											 text={message.text}
											 date={message.sending_date}
											 photo={message.photo_url}/>
								);
							})}
						</Card.Body>
						{currentChat &&
							<>
								<Card.Divider/>
								<Card.Footer>
									<Col>
										<Input css={{width: '100%'}}
											   placeholder={'Start typing...'}
											   contentRightStyling={false}
											   clearable
											   value={messageToSend}
											   onChange={(e) => {
												   setMessageToSend(e.target.value);
											   }}
											   contentRight={
												   <SendButton onClick={(e) => {
													   console.log(e)
													   sendMessage(currentChat, messageToSend)
														   .finally(() => {
															   setMessageToSend("");
															   updateMesages()
														   });
												   }}>
													   <RxPaperPlane/>
												   </SendButton>
											   }/>
										<Spacer/>
									</Col>

								</Card.Footer>
							</>

						}

					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};
