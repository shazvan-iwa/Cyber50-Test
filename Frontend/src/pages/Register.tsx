import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { registerSchema, type RegisterFormData } from "../validation/authSchema";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirm_password, ...payload } = data; 
      await API.post("/auth/register", payload);
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Register" className="w-25rem">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">

          <div className="">
            <span className="p-float-label">
              <InputText
                id="first_name"
                {...register("first_name")}
                className={`w-full ${errors.first_name ? "p-invalid" : ""}`}
              />
              <label htmlFor="first_name">First Name</label>
            </span>
            {errors.first_name && (
              <small className="p-error">{errors.first_name.message}</small>
            )}
          </div>

          <div className="">
            <span className="p-float-label">
              <InputText
                id="last_name"
                {...register("last_name")}
                className={`w-full ${errors.last_name ? "p-invalid" : ""}`}
              />
              <label htmlFor="last_name">Last Name</label>
            </span>
            {errors.last_name && (
              <small className="p-error">{errors.last_name.message}</small>
            )}
          </div>

          <div className="">
            <span className="p-float-label">
              <InputText
                id="email"
                {...register("email")}
                className={`w-full ${errors.email ? "p-invalid" : ""}`}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="">
            <span className="p-float-label">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Password
                    id="password"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    toggleMask
                    feedback={false}
                    className={`w-full ${errors.password ? "p-invalid" : ""}`}
                  />
                )}
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>
          <div className="">
            <span className="p-float-label">
              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <Password
                    id="confirm_password"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    toggleMask
                    feedback={false}
                    className={`w-full ${
                      errors.confirm_password ? "p-invalid" : ""
                    }`}
                  />
                )}
              />
              <label htmlFor="confirm_password">Confirm Password</label>
            </span>
            {errors.confirm_password && (
              <small className="p-error">
                {errors.confirm_password.message}
              </small>
            )}
          </div>

          <Button
            label="Register"
            icon="pi pi-user-plus"
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
          />
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <h2>Register</h2>
    //   <input placeholder="First Name" onChange={(e) => setForm({...form, first_name: e.target.value})} />
    //   <input placeholder="Last Name" onChange={(e) => setForm({...form, last_name: e.target.value})} />
    //   <input type="email" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
    //   <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />
    //   <button type="submit">Register</button>
    // </form>
  );
};

export default Register;