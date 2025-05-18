import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Field,
  Input,
  Box,
  Heading,
  Text,
  Alert,
  SimpleGrid,
  Checkbox,
  Flex,
  Stack
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '#hooks/useAuth';
import { Button } from '#components/ui/button';
import { PasswordInput } from '#components/ui/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormSchema, schema } from './schema';


const Register: React.FC = () => {
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<RegisterFormSchema>(
    {
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      },
      mode: "onSubmit",
      resolver: zodResolver(schema),
    }
  );

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  console.log(errors.root?.message);

  useEffect(() => {
    if (user) {
      void navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<RegisterFormSchema> = (formValues) => {
    try {
      const registerSuccess = true;
      if (registerSuccess) {
        reset();
      }

    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    },
    [],
  );

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      borderRadius="lg"
      boxShadow="lg"
      py={12}
      px={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w={{ base: "90%", md: "450px" }}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Stack gap={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="lg" mb={1}>Create Account</Heading>
            <Text color="gray.600">Fill in your details to request access to the procurement system</Text>
          </Box>

          {errors.root?.message && (
            <Alert.Root status="error" variant="subtle" rounded="md">
              <Alert.Indicator />
              <Alert.Title>
                {errors.root?.message}
              </Alert.Title>
            </Alert.Root>
          )}

          <form onSubmit={() => handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
                <Field.Root invalid={!!errors.firstName}>
                  <Field.Label>First Name</Field.Label>
                  <Input {...register("firstName")} disabled={loading} />
                  <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.lastName}>
                  <Field.Label>Last Name</Field.Label>
                  <Input {...register("lastName")} disabled={loading} />
                  <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                </Field.Root>
              </SimpleGrid>

              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input {...register("email")} disabled={loading} />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  {...register("password")}
                  disabled={loading}
                // onVisibleChange={toggleShowPassword}
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.confirmPassword}>
                <Field.Label>Confirm Password</Field.Label>
                <PasswordInput
                  {...register("confirmPassword")}
                  disabled={loading}
                // onVisibleChange={handleConfirmPasswordChange}
                />
                <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
              </Field.Root>

              <Flex alignItems="start">
                <Checkbox.Root
                  id="terms"
                  colorScheme="purple"
                >
                  <Checkbox.Control />
                  <Checkbox.Label>I agree to the terms of service and privacy policy</Checkbox.Label>
                </Checkbox.Root>
              </Flex>

              <Button
                size="2xl"
                type="submit"
                loading={loading}
                w="full"
              >
                Submit Registration Request
              </Button>
            </Stack>
          </form>

          <Box textAlign="center" mt={6}>
            <Text textAlign="center">
              Already have an account?{" "}
              <RouterLink to="/login" style={{ color: "var(--chakra-colors-blue-600)" }}>
                Sign in
              </RouterLink>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
