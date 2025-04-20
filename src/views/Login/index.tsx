import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Field, Input, InputGroup } from '@chakra-ui/react';

import { useAuth } from '#hooks/useAuth';
import { Button } from '#components/ui/button';

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [showPassword, setShowPassword] = useState(false);

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      void navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    try {
      login(formValues.username, formValues.password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to Procurement Pro</h1>
          <p className="text-gray-600">Sign in to access your procurement dashboard</p>
        </div>

        {errors && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {errors.root?.message}
          </div>
        )}

        <form onSubmit={() => handleSubmit(onSubmit)} className="space-y-6">
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Email</Field.Label>
            <Input {...register("username")} disabled={loading} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <InputGroup endElement={(
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
            )}>
              <Input {...register("password")} disabled={loading} />
            </InputGroup>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                Forgot password?
              </Link>
            </div>

          <Button
            type="submit"
            // fullWidth
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
