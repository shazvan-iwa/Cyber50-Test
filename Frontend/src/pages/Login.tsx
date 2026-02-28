import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../validation/authSchema";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// PrimeReact
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", 
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await API.post("/auth/login", data);
      auth?.login(res.data.access_token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Login" className="w-25rem">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-column gap-4"
        >
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
                    className={`w-full ${
                      errors.password ? "p-invalid" : ""
                    }`}
                  />
                )}
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <Button label="Login" icon="pi pi-sign-in" disabled={!isValid} loading={isSubmitting} type="submit" />
        </form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <h2>Login</h2>
    //   <InputText
    //     type="email"
    //     placeholder="Email"
    //     onChange={(e) =>
    //       setForm({ ...form, email: e.target.value })
    //     }
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     onChange={(e) =>
    //       setForm({ ...form, password: e.target.value })
    //     }
    //   />
    //   <button type="submit">Login</button>
    // </form>
  );
};

export default Login;