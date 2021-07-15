import React from 'react';
import { Container, Button, Icon, Label } from './styles';
import { addMonths, subMonths } from 'date-fns';
import Formatter from '../../utils/Formatter';

export interface MonthSelectProps {
  currentDate: string,
  setCurrentDate: (value: string) => void
};

const MonthSelect: React.FC<MonthSelectProps> = ({ currentDate, setCurrentDate }) => {

  const handleChangeFilter = (method: 'next' | 'prev') => {
    if (method === 'prev')
      setCurrentDate(subMonths(new Date(currentDate), 1).toString());
    else
      setCurrentDate(addMonths(new Date(currentDate), 1).toString());
  };

  return (
    <Container>
      <Button onPress={() => handleChangeFilter('prev')}>
        <Icon name="chevron-left" />
      </Button>
      <Label>{(currentDate !== '') && Formatter.monthAndYear(currentDate)}</Label>
      <Button onPress={() => handleChangeFilter('next')}>
        <Icon name="chevron-right" />
      </Button>
    </Container>
  );
}

export default MonthSelect;