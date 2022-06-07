import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { VALIDATORS } from "../../utils/formValidator";
import { AuthTitle } from "../AuthForms/style";
import { Box, Button, TextField } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { AuthError } from "@firebase/auth-types";
import { getErrorMessageFirebase } from "../../services/firebase/errorMessages";

interface SignInFields {
  password: string;
  email: string;
}

interface SignInProps {
  signIn: (email: string, password: string) => Promise<void>;
  emailFromUrl?: string;
  passwordFromUrl?: string;
  error?: AuthError | undefined;
}

export function SignInForm({ signIn, emailFromUrl, passwordFromUrl, error }: SignInProps) {
  useEffect(() => {
    if (error) {
      setError("password", { type: "auth", message: getErrorMessageFirebase(error.code) });
    }
  }, [error]);

  const schemaPassword = yup.object({
    password: yup
      .string()
      .required(VALIDATORS.PASSWORD.required)
      .max(VALIDATORS.PASSWORD.maxLength.value, VALIDATORS.PASSWORD.maxLength.message)
      .min(VALIDATORS.PASSWORD.minLength.value, VALIDATORS.PASSWORD.minLength.message),
  });

  const schemaEmail = yup.object({
    email: yup.string().required("Email is required to enter").email("Email is incorrect"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFields>({
    resolver: yupResolver(emailFromUrl ? schemaPassword : schemaEmail),
    defaultValues: {
      email: emailFromUrl,
      password: passwordFromUrl,
    },
  });

  const onSubmit: SubmitHandler<SignInFields> = async (data) => {
    try {
      await signIn(data.email, data.password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(emailFromUrl ? "password" : "email", { type: "auth", message: err.message });
      }
    }
  };

  return (
    <>
      <AuthTitle>Sign In</AuthTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="email"
            type="email"
            placeholder="Enter corporate email"
            label={"Email address"}
            hidden={!!emailFromUrl}
            {...register("email")}
            error={!!errors.email?.message}
            helperText={<ErrorMessage errors={errors} name="email" />}
          />

          <TextField
            id="password"
            placeholder="Enter password"
            label={"Password"}
            type="password"
            hidden={!emailFromUrl}
            {...register("password")}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />

          <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
            {!emailFromUrl ? "Continue" : "Sign In"}
          </Button>
        </Box>
      </form>
    </>
  );
}
