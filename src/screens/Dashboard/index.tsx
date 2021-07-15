import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { FormattedTransactionCardProps } from '../../components/TransactionCard';
import Loading from '../../components/Loading';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton
} from './styles';
import Storage from '../../utils/Storage';
import formatTransactionsList from '../../utils/generateInfosDashboard';

export interface DataListProps extends FormattedTransactionCardProps {
  id: string,
}

export interface LastTransactions {
  up?: string,
  down?: string,
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstTransaction, setFirstTransaction] = useState('');
  const [lastTransactions, setLastTransactions] = useState<LastTransactions>({});
  const [transactions, setTransactions] = useState<DataListProps[]>([] as DataListProps[]);
  const [sumUp, setSumUp] = useState(0);
  const [sumDown, setSumDown] = useState(0);

  const theme = useTheme();

  useEffect(() => { getTransactions(); }, []);
  useFocusEffect(useCallback(() => { getTransactions() }, [transactions, sumUp, sumDown]));

  const getTransactions = async () => {
    const response = await Storage.getAll('@gofinance:transactions');
    const formats = formatTransactionsList(response);
    setTransactions(formats.transactions);
    setSumUp(formats.sumUp);
    setSumDown(formats.sumDown);
    setLastTransactions(formats.lastTransactions);
    setFirstTransaction(formats.firstTransaction);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <Loading /> : (
        <>
          {transactions !== [] ? (
            <Container>
              <Header>
                <UserWrapper>
                  <UserInfo>
                    <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/37411956?v=4' }} />
                    <User>
                      <UserGreeting>Olá,</UserGreeting>
                      <UserName>Ryan</UserName>
                    </User>
                  </UserInfo>
                  <LogoutButton onPress={() => { }}>
                    <Icon name="power" />
                  </LogoutButton>
                </UserWrapper>
              </Header>

              <HighlightCards>
                <HighlightCard title="Entradas" amount={sumUp} lastTransaction={lastTransactions.up!} type="up" />
                <HighlightCard title="Saídas" amount={sumDown} lastTransaction={lastTransactions.down!} type="down" />
                <HighlightCard title="Total" amount={sumUp - sumDown} lastTransaction={firstTransaction!} type="total" />
              </HighlightCards>

              <Transactions>
                <Title>Listagem</Title>

                <TransactionsList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <TransactionCard item={item} />} />
              </Transactions>
            </Container>
          ) : (<Title>Teste</Title>)}
        </>
      )}
    </>
  );
}

export default Dashboard;