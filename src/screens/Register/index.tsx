import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import Button from '../../components/Form/Button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Form, Fields, TransactionTypes } from './styles';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import CategorySelect from '../CategorySelect';
import InputForm from '../../components/Form/InputForm';
import Storage from '../../utils/Storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),
  amount: Yup.number().typeError('Informe um valor numérico!')
    .positive('O valor precisa ser positivo!').required('Preço é obrigatório'),
})

const dataKey = "@gofinance:transactions";

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const navigation = useNavigation();

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: FormData) => {
    if (transactionType === '')
      return Alert.alert("Selecione o tipo da transação!");

    if (category.key === 'category')
      return Alert.alert("Selecione uma categoria!");

    const data = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      categoryKey: category.key,
      date: new Date()
    };


    try {
      Storage.add(dataKey, data);
      reset();
      setCategory({ key: 'category', name: 'Categoria' });
      setTransactionType('');
      navigation.navigate('Listagem');
    } catch (error) {
      Alert.alert("Não foi possível salvar esta transação! Tente novamente mais tarde.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
        <Form>
          <Fields>
            <InputForm control={control} name="name" placeholder="Nome" autoCorrect={false} error={errors.name && errors.name.message} />
            <InputForm control={control} name="amount" placeholder="Preço" keyboardType="numeric" error={errors.amount && errors.amount.message} />
            <TransactionTypes>
              <TransactionTypeButton
                isActive={transactionType === 'up'}
                type="up"
                title="Ganhos"
                onPress={() => handleTransactionTypeSelect('up')} />
              <TransactionTypeButton
                isActive={transactionType === 'down'}
                type="down"
                title="Gastos"
                onPress={() => handleTransactionTypeSelect('down')} />
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenCategoryModal} />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseCategoryModal} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;