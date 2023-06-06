import {Card, Container, Grid} from "@nextui-org/react";
import {Sidebar} from "../components/sidebar";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import {WelcomePage} from "../pages/welcome";
import * as React from "react";
import {Children} from "react";

export const Layout = ({children}) => {
    return (
        <Container lg css={{maxHeight: "100vh"}}>
            <Grid.Container gap={2}>
                <Grid xs={12} sm={3}>
                    <Card>
                        <Card.Body>
                            <Sidebar/>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={9}>
                    <Card>
                        <Card.Body>
                            {children}
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Container>
    )
}
