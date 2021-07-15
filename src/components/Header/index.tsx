import React from 'react';

import { Container, Title } from './styles';

export interface HeaderProps {
    title: string
};

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Container>
            <Title>{title}</Title>
        </Container>
    );
}

export default Header;