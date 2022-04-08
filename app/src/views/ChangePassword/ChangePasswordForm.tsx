import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { ErrorMessage } from "@hookform/error-message";
import { FirebaseError } from "@firebase/util";
import { VALIDATORS } from "../../utils/formValidator";
import { passwordVisibleOptions } from "../../utils/passwordVisible";

interface IChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  user: User;
}

export function ChangePasswordForm({ user }: ChangePasswordFormProps): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    setError,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<IChangePasswordForm>();
  const password = watch("newPassword");

  const cancel = () => {
    navigate("/");
  };

  const postNewPassword = async (oldPassword: string, newPassword: string) => {
    const credential = EmailAuthProvider.credential(user.email || "", oldPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const errorHandlerSubmitPassword = (error: unknown) => {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/wrong-password") {
        return "Error: wrong password";
      }
    }
    return "Error: Something goes wrong. Try later";
  };

  const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
    try {
      await postNewPassword(data.oldPassword, data.newPassword);
      navigate("/");
    } catch (error) {
      setError(
        "oldPassword",
        { message: errorHandlerSubmitPassword(error) },
        { shouldFocus: true }
      );
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Change Password
            </Typography>
          </Box>

          <TextField
            label={"Old Password"}
            {...register("oldPassword", { required: "Password is required" })}
            error={!!errors.oldPassword}
            helperText={<ErrorMessage errors={errors} name={"oldPassword"} />}
            {...passwordVisibleOptions()}
            placeholder={"•  •  •  •  •  •  •  •"}
          />

          <TextField
            label={"New Password"}
            {...register("newPassword", VALIDATORS.PASSWORD)}
            error={!!errors.newPassword}
            helperText={<ErrorMessage errors={errors} name={"newPassword"} />}
            {...passwordVisibleOptions()}
            placeholder={"•  •  •  •  •  •  •  •"}
          />
          <TextField
            {...passwordVisibleOptions()}
            label={"Confirm Password"}
            {...register("confirmPassword", {
              required: "The passwords do not match",
              validate: (value) => value === password || "The passwords do not match",
            })}
            placeholder={"•  •  •  •  •  •  •  •"}
            error={!!errors.confirmPassword}
            helperText={<ErrorMessage errors={errors} name={"confirmPassword"} />}
          />
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button disabled={!isDirty} variant={"contained"} type="submit">
              Save Changes
            </Button>
            <Button variant={"outlined"} onClick={cancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
