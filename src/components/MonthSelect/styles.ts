import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`;

export const Button = styled(BorderlessButton)``;
export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
export const Label = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

