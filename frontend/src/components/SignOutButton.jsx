import * as apiClient from "../apiCilet";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutUser } from "../reducers/userSlice";
import toast from "react-hot-toast";
const SignOutButton = () => {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: apiClient.logout,

    onSuccess: async (data) => {
      dispatch(logoutUser());
      toast.success(data.message);
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <button className="text-white px-3 font-bold " onClick={handleLogout}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
