import React from 'react';
import { Alert } from 'react-native';
import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, SignInWrapper } from './styles';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SignInSocialButton from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar à conta Google!');
    }
  }

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar à conta Apple!');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com {'\n'} uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <SignInWrapper>
          <SignInSocialButton onPress={handleSignInWithGoogle} title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton onPress={handleSignInWithApple} title="Entrar com Apple" svg={AppleSvg} />
        </SignInWrapper>
      </Footer>
    </Container>
  );
}

export default SignIn;