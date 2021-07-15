import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { CategoryWithAmount } from '.';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ScrollChart = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24, paddingBottom: getBottomSpace() },
})`
  width: 100%;
`;

export const WrapEmptyList = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LabelEmptyList = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
