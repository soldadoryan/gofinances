import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content: space-between;
`;
export const Fields = styled.View``;
export const TransactionTypes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin: 8px 0 16px;
`;
