import React from 'react';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';

export function Signup() {
    return (
        <WrapperContent >
            <ContainerForm >
                <Form mode='signup'/>
            </ContainerForm>
        </WrapperContent>
    )
};
