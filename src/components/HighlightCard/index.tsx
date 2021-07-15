import React from 'react';
import Formatter from '../../utils/Formatter';
import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

interface Props {
    type: 'up' | 'down' | 'total',
    title: string,
    amount: number | string,
    lastTransaction: string,
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
};

const HighlightCard: React.FC<Props> = ({ type, title, amount, lastTransaction }) => {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Amount type={type}>{Formatter.currency(amount)}</Amount>
                <LastTransaction type={type}>
                    {(lastTransaction !== '--' && type === 'total') && 'Desde '}
                    {(lastTransaction !== '--' && type !== 'total') && 'Última transação em '}
                    {lastTransaction !== '--' ? `${Formatter.fullDate(lastTransaction)}` : '--'}
                </LastTransaction>
            </Footer>
        </Container>
    );
}

export default HighlightCard;