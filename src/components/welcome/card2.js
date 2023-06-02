import { Card, Col, Text } from "@nextui-org/react"
import cover2 from "../../images/cover-2.jpg"

export const Card2 = () => (
	<Card css={{ bg: "$black", w: "100%"}}>
		<Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
			<Col>
				<Text size={12} weight="bold" transform="uppercase" color="#333333AA">
					Post beaty
				</Text>
				<Text h4 color="#333">
					Share your life
				</Text>
			</Col>
		</Card.Header>
		<Card.Image
			src={cover2}

			objectFit="cover"
			alt="Card image background"
		/>
	</Card>
);