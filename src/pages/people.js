import {Layout} from "../layout/layout";
import {Avatar, Card, Col, Grid, Input, Link, Row, Spacer, Text, Tooltip, User} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {getByName, noPhotoURL} from "../utils/users";
import {RiCheckboxCircleFill} from "react-icons/ri";
import {BASE_URL} from "../utils/config";

export const PeoplePage = () => {
    const [name, setName] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!name) return

        const result = getByName(name).then(res => {
            setUsers(res)
        })

    }, [name])

    return (
        <Layout>
            <Card variant={"bordered"}>
                <Card.Header>
                    <Text h3>Search people</Text>
                </Card.Header>
                <Card.Divider/>
                <Card.Body>
                    <Input css={{width: "100%"}} labelPlaceholder={"Name"} onChange={(e) => {
                        const name = e.target.value
                        setName(name)
                    }}/>

                </Card.Body>
            </Card>

            <Spacer/>

            <Card variant={"bordered"}>
                <Card.Header>
                    <Text h3>Result</Text>
                </Card.Header>

                <Card.Divider/>

                <Card.Body>
                    <Grid.Container gap={2}>
                        {users && (
                            users.map(user => {
                                const data = user.__data__

                                return (
                                    <Grid xs={12} sm={4}>
                                        <Link href={`/id/${data.id}`} css={{minWidth: "100%"}}>
                                            <Card>
                                                <Card.Body>

                                                    <User name={`${data?.first_name} ${data?.last_name}`} src={BASE_URL + data?.photo_url || noPhotoURL} >
                                                        {data?.is_verified && <Tooltip
                                                            content={`Person ${data?.first_name} ${data?.last_name} is verified`}>
                                                            <RiCheckboxCircleFill
                                                                fill={'#a29bfe'}/>
                                                        </Tooltip>}
                                                    </User>

                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Grid>

                                )
                            })
                        )}

                        {!users[0] && <Text h5>Nothing found</Text>}
                    </Grid.Container>
                </Card.Body>


            </Card>
        </Layout>
    )
}
