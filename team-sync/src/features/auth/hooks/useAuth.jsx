import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginEmployee,registerEmployee } from "../state/auth/authAction.jsx";

export let useAuth = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onRegisterSubmit = async (data) => {
  const result = await dispatch(registerEmployee(data));

  console.log(result);

  if (registerEmployee.fulfilled.match(result)) {
    navigate("/");
  }
};

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onLoginSubmit = (data) => {
    dispatch(loginEmployee(data));
  };

  return {
    register,
    handleSubmit,
    errors,
    onRegisterSubmit,
    onLoginSubmit,
    watch,
    navigate,
    dispatch,
  };
};
