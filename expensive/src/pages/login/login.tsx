import { Center, TextInput, Button, Box, em } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessToken, useApi } from '../../context/expensiveApiContext';

export function Login() {
  const { auth } = useApi();
  const { setAccessToken } = useAccessToken();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const login = useCallback((email: string, password: string) => {
    auth!.login(email, password).then((data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        setAccessToken!(data.accessToken);
        navigate('/home');
      }
    });
  }, []);

  return (
    <Center style={{ height: '100vh' }} bg="var(--mantine-color-dark-6)">
      <Box w={'25vw'}>
        <form
          onSubmit={form.onSubmit(({ email, password }) =>
            login(email, password)
          )}
        >
          <TextInput
            style={{ color: '#FFF' }}
            key={form.key('email')}
            label="Email"
            placeholder="foo@bar.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            style={{ color: '#FFF' }}
            mt={10}
            key={form.key('password')}
            type="password"
            label="Password"
            placeholder="******"
            {...form.getInputProps('password')}
          />

          <Button type="submit" w={'100%'} color="orange.6" mt={20}>
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
}

export default Login;
