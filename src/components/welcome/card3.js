import {Card, Col, Row, Text} from '@nextui-org/react';

export const Card3 = () => (
	<Card css={{p: '$6'}}>
		<Card.Header>
			<Text h2 color="black">
				Hello! We are Chatterbox Team
			</Text>
		</Card.Header>

		<Card.Body>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequuntur corporis culpa doloribus, eveniet exercitationem fugit hic id, incidunt ipsa iste labore mollitia nesciunt possimus recusandae reprehenderit vero voluptas voluptatum.
			<Row>
				<Col alignItems={"center"}>
					<Text size={36}>
						12,000
					</Text>
					<Text>
						daily users
					</Text>
				</Col>
				<Col alignItems={"center"}>
					<Text size={36}>
						69m +
					</Text>
					<Text>
						messages every day
					</Text>
				</Col>
				<Col alignItems={"center"}>
					<Text size={36}>
						17m +
					</Text>
					<Text>
						users at all
					</Text>
				</Col>
			</Row>
		</Card.Body>

	</Card>
);