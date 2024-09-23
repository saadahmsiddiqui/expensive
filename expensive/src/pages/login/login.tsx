import { Center, TextInput, Button, Box } from '@mantine/core';

export function Login() {
  return (
    <Center style={{ height: '100vh' }} bg="var(--mantine-color-gray-light)">
      <Box>
        <TextInput label="Email" placeholder="foo@bar.com" />
        <TextInput mt={10} label="Password" placeholder="******" />

        <Button mt={10}>Login</Button>
      </Box>
    </Center>
  );
}

export default Login;
