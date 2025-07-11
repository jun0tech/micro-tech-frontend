import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useRegister } from "@/services/auth/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, User2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// const departments = [
//   { value: "mechanical", label: "Mechanical" },
//   { value: "electrical", label: "Electrical" },
//   { value: "plumbing", label: "Plumbing" },
//   { value: "hr", label: "HR" },
//   { value: "management", label: "Management" },
//   { value: "procurement", label: "Procurement" },
// ];

const registerSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    // department: z.string().min(1, "Please select a department"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const navigate = useNavigate();
  const { mutateAsync: register, isError, error, isPending } = useRegister();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      // department: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    try {
      // Only send fields required by RegisterRequest
      const { first_name, last_name, email, password, confirm_password } = data;
      await register({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      });
      toast.success("Registration request sent successfully", {
        description: "Redirecting to login page...",
      });
      navigate("/login");
    } catch (err) {
      // Error is handled by isError and error
      console.error("Registration failed:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 relative">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full opacity-10 blur-3xl mix-blend-multiply"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="w-full max-w-lg z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create <span className="text-blue-600">Account</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in your details to request access to the procurement system
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-lg border border-gray-200/50 p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="first_name"
              name="first_name"
              type="text"
              label="First Name"
              autoComplete="given-name"
              required
              control={control}
              icon={
                <User2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />

            <FormInput
              id="last_name"
              name="last_name"
              type="text"
              label="Last Name"
              autoComplete="family-name"
              required
              control={control}
              icon={
                <User2 className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              label="Work Email"
              autoComplete="email"
              required
              control={control}
              helperText="Use your organizational email for login credentials (@microtechims.com)."
              icon={
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              }
            />

            {/* <FormSelect
              id="department"
              name="department"
              label="Department"
              options={departments}
              placeholder="Select your department"
              required
              control={control}
              helperText="Select the department you work in"
            /> */}

            <FormInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              autoComplete="new-password"
              required
              control={control}
              helperText="Password must be at least 6 characters."
              icon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
            />

            <FormInput
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              autoComplete="new-password"
              required
              control={control}
              icon={
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-400 hover:text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
            />

            {/* Terms and Conditions */}
            <div className="mt-6">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      privacy policy
                    </a>
                  </label>
                </div>
              </div>
            </div>

            {isError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">
                  {error?.message || "Registration failed. Please try again."}
                </p>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className={`w-full py-3 rounded-md transition-all duration-200 font-medium ${
                  termsAccepted
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!termsAccepted || isPending}
              >
                {isPending ? "Registering..." : "Submit Registration Request"}
              </Button>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Chrome, Safari, Edge autofill styles */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
            transition-delay: background-color 5000s, color 5000s;
          }
        `,
        }}
      />
    </div>
  );
}
