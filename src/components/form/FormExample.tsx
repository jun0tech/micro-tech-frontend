import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInputField, FormTextareaField, SelectField } from "./";

// Example validation schema
const exampleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
  bio: z.string().optional(),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

const FormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      bio: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = (data: ExampleFormData) => {
    console.log("Form data:", data);
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Manager", value: "manager" },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Example Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          id="name"
          label="Full Name"
          type="text"
          required
          error={errors.name?.message}
          {...register("name")}
          placeholder="Enter your full name"
        />

        <FormInputField
          id="email"
          label="Email Address"
          type="email"
          required
          error={errors.email?.message}
          {...register("email")}
          placeholder="Enter your email"
        />

        <FormInputField
          id="password"
          label="Password"
          type="password"
          required
          error={errors.password?.message}
          {...register("password")}
          placeholder="Enter your password"
        />

        <SelectField
          id="role"
          label="Role"
          required
          placeholder="Select a role"
          options={roleOptions}
          error={errors.role?.message}
          onValueChange={(value) => setValue("role", value)}
        />

        <FormTextareaField
          id="bio"
          label="Bio (Optional)"
          error={errors.bio?.message}
          {...register("bio")}
          placeholder="Tell us about yourself..."
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>

      {/* Display selected values for demonstration */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold mb-2">Current Values:</h3>
        <pre className="text-xs text-gray-600">
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormExample;
