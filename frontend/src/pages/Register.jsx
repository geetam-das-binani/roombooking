import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../apiCilet";
import toast from 'react-hot-toast';
import { loggedInUser } from "../reducers/userSlice";
import {Button} from '@chakra-ui/react'
const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.authUser);
  const handleAvatarChange = (e) => {
    const inputFile = e.target.files?.[0];
    if (inputFile) {
      setFile(inputFile);
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.register,

    onSuccess: async (data) => {
      dispatch(loggedInUser(data?.userWithoutPassword));
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // !when form gets form submitted
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("avatar", file);

    mutate(formData);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col 
  gap-5 
  "
    >
      <h2 className="text-3xl font-bold ">Create An Account</h2>
      <div className=" flex flex-col gap-5 md:flex-row">
        <label className="text-gray-700 text-sm font-bold flex-1">
        Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("name", { required: "This field is required" })}
            type="text"
            name="name"
          />
        {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
       
      </div>
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
            minLength: { value: 8, message: "Must be at least 8 characters" },
          })}
          type="password"
          name="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Password do not match";
              }
            },
          })}
          type="text"
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Choose Photo
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          onChange={handleAvatarChange}
          type="file"
          name="photo"
          accept="image/*"
          required
        />
      </label>
      <span>
        <Button 
          isLoading={isPending}
          type="submit"
         
        colorScheme="blue"
        >
          Create Account
        </Button>
      </span>
    </form>
  );
};

export default Register;
