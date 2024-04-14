import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
import toast from "react-hot-toast";
import { loggedInUser } from "../reducers/userSlice";
const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (isAuthenticated) navigate(location.state?.from?.pathname || "/");
  }, [isAuthenticated]);

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.login,

    onSuccess: async (data) => {
      dispatch(loggedInUser(data?.userWithoutPassword));
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex-col flex gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
          type="email"
          name="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
          })}
          type="password"
          name="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registererd ?
          <Link className="underline" to="/register">
            {" "}
            Create an account here
          </Link>
        </span>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl
          disabled:bg-gray-400
          "
        >
          Login
        </button>
      </span>
    </form>
  );
};
export default Login;
