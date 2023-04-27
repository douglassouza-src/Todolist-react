import React from 'react';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperContent';

export function Login() {
    return (
        <WrapperContent>
            <ContainerForm>                                                            
                <Form mode='login'/>
            </ContainerForm>
        </WrapperContent>
    )
};
