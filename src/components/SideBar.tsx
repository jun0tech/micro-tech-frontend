import { ReactNode } from 'react';
import { useAuth } from '#hooks/useAuth';
import { Box, Button, Flex, Icon, VStack } from '@chakra-ui/react';
import { FiCompass, FiStar } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ColorModeButton } from './ui/color-mode';

interface LinkItemProps {
  name: string;
  path: string;
  icon: ReactNode;
}

const LinkItems: LinkItemProps[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <FiCompass />
  },
  {
    name: 'Catalogue',
    path: '/catalogue',
    icon: <FiStar />,
  },
];

const SideBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    const isLogout = logout();

    if (isLogout) {
      void navigate("/login");
    } else {
      alert("Error logout");
    }
  };


  return (
    <VStack
      align="stretch"
      color="fg"
      h="100%"
    >
      <Flex alignItems="center">
        <ColorModeButton />
        <Box
          fontSize="xl"
          p={3}
          textAlign="left"
        >
          Microtech
        </Box>
      </Flex>

      {LinkItems.map((link) => (
        <Link
          key={link.path}
          to={link.path}
        >
          <Box
            mt={4}
            p={2}
            borderRadius="lg"
            bg={location.pathname === link.path ? "cyan.400" : "transparent"}
            color={location.pathname === link.path ? "gray.100" : "fg"}
            transition="background 0.2s ease-out"
            _focus={{boxShadow: "none" }}
            _hover={{
              bg: "cyan.400",
              color: "gray.100",
              transition: "background 0.3s ease-in",
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
            >
              <Icon>
                {link.icon}
              </Icon>
              {link.name}
            </Flex>
          </Box>
        </Link>
      ))}

      <Box py={5}>
        <Button
          colorPalette="red"
          variant="solid"
          width="full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </VStack>

  );
}
export default SideBar;
