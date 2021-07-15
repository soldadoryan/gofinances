import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
    type: 'up' | 'down';
}

interface ButtonProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.View`
    width: 48%;
    border: 1px solid ${({theme})=>theme.colors.text};
    border-radius: 5px;
    justify-content: center;
    ${({theme, type, isActive})=> (type === 'up' && isActive) && css`background-color: ${theme.colors.success_light}; border: 0;`};
    ${({theme, type, isActive})=> (type === 'down' && isActive) && css`background-color: ${theme.colors.attention_light}; border: 0;`};
`;
export const Button = styled(RectButton)<ButtonProps>`
    width: 100%;
    padding: 16px;
    flex-direction: row;
    align-items: center;
`;
export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({theme, type}) => type === 'up' ? theme.colors.success : theme.colors.attention};
`;
export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

