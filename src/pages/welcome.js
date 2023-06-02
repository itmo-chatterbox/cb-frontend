import Header from '../components/header';
import {Card1} from '../components/welcome/card1';
import {Grid} from '@nextui-org/react';
import {Card2} from '../components/welcome/card2';
import {Card3} from '../components/welcome/card3';

export const WelcomePage = () => {
	return (
		<>

			<Grid.Container justify="center" gap={2}>
				<Grid xs={12} sm={6}>
					<Card3 />
				</Grid>

				<Grid xs={12} sm={2}>
					<Card2 />
				</Grid>

				<Grid xs={12} sm={3}>
					<Card1 />
				</Grid>

			</Grid.Container>

		</>

	);
};