import {redirect, useParams} from 'react-router-dom';
import {getUserInfo, userCurrentInfo} from '../utils/users';
import {useEffect, useState} from 'react';
import {Card, Col, Grid, Image, Row, Text, Badge, Tooltip, Divider, Button} from '@nextui-org/react';
import {RiCheckboxCircleFill} from "react-icons/ri";

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

    useEffect(() => {
        userCurrentInfo().then(res => {
            if (!pageId) {
                setPageId(res.id);
                setMyPage(true)
                return
            }
            console.log(pageId == res.id)

            if (pageId == res.id) {
                setMyPage(true)
            }
        })

        if (pageId) {
            getUserInfo(pageId).then(res => {
                if (!res?.id) {
                    userCurrentInfo().then(res => {
                        setPageId(res?.id)
                    })
                }

                setFirstName(res?.first_name)
                setLastName(res?.last_name)
                setPhoto(res?.photo_url)
                setStatus(res?.status || `${res?.first_name} спокоен...`)
                setIsVerified(res?.is_verified)
                setAbout(res?.about || "Человек")
            })
        }

    }, [pageId]);

    return (
        <>
            <Grid.Container gap={2}>
                <Grid xs={12} sm={4}>
                    <Col>
                        <Card variant={'bordered'}>
                            <Image src={photo}/>
                        </Card>
                        <Divider css={{m: "$6"}}/>
                        {myPage && <a href={"/edit"}>
                            <Button css={{width: "100%"}} flat>
                                Редактировать
                            </Button>
                        </a>
                        }

                    </Col>

                </Grid>
                <Grid xs={12} sm={8}>
                    <Col gap={2}>
                        <Row align={"center"}>
                            <Row align={"baseline"}>
                                <Text h3>{firstName} {lastName}</Text> &nbsp;
                                {isVerified &&
                                    <Tooltip content={`Личность пользователя ${firstName} ${lastName} подтверждена`}>
                                        <RiCheckboxCircleFill fill={"#a29bfe"}/>
                                    </Tooltip>}
                            </Row>
                        </Row>
                        <Text h5 css={{
                            color: "#888",
                            fontWeight: '$light'
                        }}>{status}</Text>

                        <Divider css={{m: "$6"}}/>

                        <Card variant={"bordered"}>
                            <Card.Header>
                                <Text css={{fontWeight: "bold"}}>
                                    Обо мне
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
        </>
    );
};
