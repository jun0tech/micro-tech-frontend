import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Button, Field, Input, InputGroup } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '#hooks/useAuth';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if (user) {
      void navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
          <p className="text-gray-600">Fill in your details to request access to the procurement system</p>
        </div>

        {errors && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {errors.root?.message}
          </div>
        )}

        <form onSubmit={() => handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input {...register("email")} disabled={loading} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
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
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={loading}
              />
            </InputGroup>
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <InputGroup endElement={(
              <button
                type="button"
                onClick={toggleShowPassword}
                className="focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            )}>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                // {...register("confirmPassword")}
                disabled={loading}
              />
            </InputGroup>
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the terms of service and privacy policy
              </label>
            </div>
          </div>

          <Button
            type="submit" 
            isLoading={loading}
          >
            Submit Registration Request
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
