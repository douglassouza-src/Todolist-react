import React from "react";
import { ContainerForm } from "../../components/ContainerForm";
import { Form } from "../../components/Form";
import { GlobalStyle } from "../../config";

export function Login() {
  return (
    <>
      <GlobalStyle />
      <ContainerForm>
        <Form mode="login" />
      </ContainerForm>
    </>
  );
}
