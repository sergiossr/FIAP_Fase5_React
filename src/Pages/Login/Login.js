import React from "react";
import LoginForm from "../../Componentes/LoginBox/LoginForm";
import { Container } from "@material-ui/core";

function Login(props ) {

    return (
        <Container >
           
            <div className="container">
                <LoginForm/> 
            </div>
           
        </Container>      
    );
}
export default Login;