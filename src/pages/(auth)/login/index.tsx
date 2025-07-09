import { ControlledCheckbox } from "@/components/form/form-checkbox-field";
import FormInputField from "@/components/form/form-input-field";
import { Button } from "@/components/ui/button";
import { GoogleIcon, LogoIcon } from "@/components/ui/icons";
import { useLogin } from "@/services/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { mutateAsync: login, isError, error, isPending } = useLogin();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log(data);
      await login(data);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 relative">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-md">
            <LogoIcon />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">MicroTech IMS</span>
          </h1>
          <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50 p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              {...control.register("email")}
              endAdornment={
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />

            <FormInputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              {...control.register("password")}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
            />

            {isError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">
                  {error?.message || "Login failed. Please try again."}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <ControlledCheckbox
                control={control}
                name="rememberMe"
                id="remember-me"
                label="Remember me"
              />

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-md transition-all duration-200 font-medium shadow-sm"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 text-gray-500 backdrop-blur-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                disabled
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300/80 rounded-md text-gray-500 bg-white/50 opacity-50 cursor-not-allowed transition-colors duration-200 font-medium"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
