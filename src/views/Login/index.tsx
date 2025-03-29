import { useEffect, useState } from 'react';
import { Button, Input, Flex, Grid } from '@chakra-ui/react';
import { useAuth } from '#hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isLoggedIn = login(username, password);
    if (isLoggedIn) {
      void navigate('/dashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  // Redirect after login
  useEffect(() => {
    if (user) {
      void navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="bg"
      height="100vh"
    >
      <form onSubmit={handleLogin} className="form">
        <Grid gap={4}>
          <Input
            bg="bg.secondary"
            color="fg"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            bg="bg.secondary"
            color="fg"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorPalette="green" type="submit">Login</Button>
        </Grid>
      </form>
    </Flex>
  );
};

export default Login;
