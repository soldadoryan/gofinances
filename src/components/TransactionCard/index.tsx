import React from 'react';
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';

interface CategoryProps {
    key: string;
    name: string;
    icon: string;
    color: string;
}

export interface TransactionCardProps {
    name: string;
    type: "up" | "down";
    amount: string;
    categoryKey: string;
    date: string;
}

export interface FormattedTransactionCardProps extends TransactionCardProps {
    category: CategoryProps
};

export interface Props {
    item: FormattedTransactionCardProps
};

const TransactionCard: React.FC<Props> = ({ item }) => {
    return (
        <Container>
            <Title>{item.name}</Title>
            <Amount type={item.type}>
                {item.type === 'down' && '- '}
                {item.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={item.category.icon} />
                    <CategoryName>{item.category.name}</CategoryName>
                </Category>
                <Date>{item.date}</Date>
            </Footer>
        </Container>
    );
}

export default TransactionCard;