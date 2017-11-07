import React from "react";
import styled from "styled-components";
import { compose } from "recompose";
import LoginContainer from "../../containers/Login";

const Background = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const LeftImage = styled.div`
  background-image: url("https://images.unsplash.com/photo-1419407118704-43ccfda4036d?auto=format&fit=crop&w=2001&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex: 0.7;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-grow: 1;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  margin-top: 14px;
`;

const Input = styled.input`
  display: flex;
  min-width: 240px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  outline: none;
  font-size: 16px;
  line-height: 22px;
  padding: 6px 12px 6px 12px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const LoginPage = props => (
  <Background>
    <LeftImage />
    <Form>
      <Section>
        <div className="title">Log In</div>
      </Section>

      <Section>
        <Input type="text" placeholder="email" className="textfield" />
      </Section>
      <Section>
        <Input type="text" placeholder="password" className="textfield" />
      </Section>

      <Section>
        <button
          className="btn btn-primary"
          onClick={() => props.history.push("/home")}
        >
          Login
        </button>
      </Section>
    </Form>
  </Background>
);

export default compose(LoginContainer)(LoginPage);
