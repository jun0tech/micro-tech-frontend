"use client"

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Link,
  HStack,
  Checkbox,
  Stack,
  Field,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { toaster } from "#components/ui/toaster";
import { PasswordInput } from "#components/ui/password-input";

interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
      toaster.create({
        title: "Login successful",
        type: "success",
        duration: 3000,
        closable: true,
      })
    } catch (error) {
      toaster.create({
        title: "Login failed",
        type: "error",
        description: "Invalid email or password",
        duration: 3000,
        closable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
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
        bg="white"
      >
        <Stack gap={6}>
          <Box textAlign="center">
            <Heading size="lg" mb={2}>
              Welcome Back
            </Heading>
            <Text color="gray.600">Sign in to your account</Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              <HStack justify="space-between">
                <Checkbox.Root {...register("rememberMe")}>
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me</Checkbox.Label>
                </Checkbox.Root>
                <Link color="blue.600" fontSize="sm">
                  Forgot password?
                </Link>
              </HStack>

              <Button
                type="submit"
                size="lg"
                width="full"
                loading={isLoading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Text textAlign="center">
            Don't have an account?{" "}
            <RouterLink to="/register" style={{ color: "var(--chakra-colors-blue-600)" }}>
              Sign up
            </RouterLink>
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default Login
