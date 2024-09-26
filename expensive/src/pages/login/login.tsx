import { Center, TextInput, Button, Box, em } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Auth } from '../../lib/expensive';
import { useCallback } from 'react';

export function Login() {
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
    const auth = new Auth('http://localhost:3000/api');

    auth.login(email, password).then((data) => {
      const tokenKey = 'accessToken';

      if (tokenKey in data) {
        auth.storeAccessToken(data[tokenKey]);
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
