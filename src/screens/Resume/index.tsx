import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';
import { Category } from '../CategorySelect';
import { Container, ScrollChart, ChartContainer, WrapEmptyList, LabelEmptyList } from './styles';
import ResumeInfo from '../../classes/ResumeInfo';
import Formatter from '../../utils/Formatter';
import { VictoryPie } from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import MonthSelect from '../../components/MonthSelect';
import Loading from '../../components/Loading';

export interface CategoryWithAmount extends Category {
  amount: number,
  percent: string,
  color: string,
};

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState((new Date()).toString());
  const [categories, setCategories] = useState<CategoryWithAmount[]>([] as CategoryWithAmount[]);

  const theme = useTheme();

  const loadInfos = async () => {
    setIsLoading(true);
    const response = await ResumeInfo.totalPerCategory(dateFilter);
    setCategories(response);
    setIsLoading(false);
  };
  useFocusEffect(useCallback(() => { loadInfos() }, [dateFilter]));
  return (
    <>
      {isLoading ? <Loading /> : (
        <Container>
          <Header title="Resumo" />
          <MonthSelect currentDate={dateFilter} setCurrentDate={setDateFilter} />
          {categories.length > 0 ? (
            <ScrollChart>
              <ChartContainer>
                <VictoryPie
                  data={categories}
                  x="percent"
                  y="amount"
                  colorScale={categories.map(category => category.color)}
                  labelRadius={75}
                  style={{
                    labels: {
                      fontSize: RFValue(16),
                      fontWeight: 'bold',
                      fill: theme.colors.shape
                    }
                  }}
                />
              </ChartContainer>
              {categories.map((item) => <HistoryCard key={item.key} title={item.name} amount={Formatter.currency(item.amount)} color={item.color} />)}
            </ScrollChart>
          ) : (
            <WrapEmptyList>
              <LabelEmptyList>Não possui dados suficientes!</LabelEmptyList>
            </WrapEmptyList>
          )}
        </Container>
      )}
    </>
  );
}

export default Resume;