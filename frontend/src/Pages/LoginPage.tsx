import * as Yup from "yup";
import { UseAuth } from "../Context/UseAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginFormsInput = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInput>({
    resolver: yupResolver(validation),
  });

  const handleLogin = (form: LoginFormsInput) => {
    loginUser(form.userName, form.password)
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-custom lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg
                               focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("userName")}
                  required={true}
                />
                {errors.userName ? <p>{errors.userName.message}</p> : ""}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                  required={true}
                />
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3
                                focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600
                               dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="">Remember me</label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-primary-700 focus:ring-4
                          focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
                          px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light">
                Don’t have an account yet?{" "}
                <a
                  href="register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
