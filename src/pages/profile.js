import {redirect, useParams} from 'react-router-dom';
import {getUserInfo, userCurrentInfo} from '../utils/users';
import {useEffect, useState} from 'react';
import {Card, Grid, Image, Text} from '@nextui-org/react';

export const ProfilePage = ({myPage = false}) => {

	const {id} = useParams();

	const [pageId, setPageId] = useState();

	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [status, setStatus] = useState(null);


	useEffect(() => {
		if (myPage) {
			userCurrentInfo().then(res => {
				setPageId(res.id);
			});
		} else {
			setPageId(id)
		}

		if (pageId) {
			getUserInfo(pageId).then(res => {
				if (!res) {
					redirect("/")
					return
				}
				setFirstName(res?.first_name)
				setLastName(res?.last_name)
				setPhoto(res?.photo_url)
				setStatus(res?.status || `${res?.first_name} спокоен...`)

			})
		}

	}, [pageId]);

	return (
		<>
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Card variant={'bordered'}>
						<Image src={photo} />
					</Card>
				</Grid>
				<Grid>
					<Text h3>{firstName} {lastName}</Text>
					<Text h5 css={{
						color: "#888",
						fontWeight: '$light'
					}}>{status}</Text>

				</Grid>
			</Grid.Container>
		</>
	);
};
