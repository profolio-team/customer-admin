import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { VALIDATORS } from "../../utils/formValidator";
import { ErrorMessage } from "@hookform/error-message";
import { passwordVisibleOptions } from "../../utils/passwordVisible";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignInFormProps {
  signIn: (props: UserCredentials) => Promise<void>;
  emailFromUrl: string;
  passwordFromUrl: string;
  error: string;
}

export function SignInForm({ signIn, emailFromUrl, passwordFromUrl, error }: SignInFormProps) {
  const validationOptions = (emailFromUrl: string) => {
    if (emailFromUrl) {
      return VALIDATORS.PASSWORD;
    }
    return {};
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>({
    defaultValues: {
      email: emailFromUrl,
      password: passwordFromUrl,
    },
  });
  const onSubmit: SubmitHandler<UserCredentials> = (data) => {
    signIn(data);
  };
  return (
    <>
      <Box>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Sign In
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            {...register("email", VALIDATORS.EMAIL)}
            hidden={!!emailFromUrl}
            id="email"
            type="email"
            placeholder="Enter corporate email"
            label={"Email address"}
            error={!!errors.email}
            helperText={<ErrorMessage errors={errors} name="email" />}
          />

          <TextField
            {...register("password", { ...validationOptions(emailFromUrl) })}
            helperText={<ErrorMessage errors={errors} name="password" />}
            hidden={!emailFromUrl}
            error={!!errors.password}
            autoComplete="Password"
            id="password"
            placeholder="Enter password"
            label={"Password"}
            {...passwordVisibleOptions()}
          />

          <Link hidden={!emailFromUrl} href="/restore-password" variant="body2">
            Forgot password?
          </Link>
          <FormControlLabel
            hidden={!emailFromUrl}
            checked
            control={<Checkbox disabled={!emailFromUrl} name="rememberMe" />}
            label="Remember me"
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
            Sign In
          </Button>
          {error && <p style={{ color: "var(--color-functional-error)" }}>Error: {error}</p>}
        </Box>
      </form>
    </>
  );
}
