import { Center, TextInput, Button, Box } from '@mantine/core';

export function Login() {
  return (
    <Center style={{ height: '100vh' }} bg="var(--mantine-color-dark-6)">
      <Box w={'25vw'}>
        <TextInput
          style={{ color: '#FFF' }}
          label="Email"
          placeholder="foo@bar.com"
        />

        <TextInput
          style={{ color: '#FFF' }}
          mt={10}
          label="Password"
          placeholder="******"
        />

        <Button w={'100%'} color="orange.6" mt={20}>
          Login
        </Button>
      </Box>
    </Center>
  );
}

export default Login;
