import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, MenuItem, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { VALIDATORS } from "../../utils/formValidator";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  postUserInfo: (props: AdminUserFormFields) => Promise<{ result: boolean; message: string }>;
  defaultValues?: AdminUserFormFields;
}

export interface AdminUserFormFields {
  lastName: string;
  firstName: string;
  email: string;
  job: string;
  grade: string;
  location: string;
  project: string;
  role: string;
  isActive: boolean;
}

export function AdminUserForm({ postUserInfo, defaultValues }: UserFormProps) {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const roles = ["user", "admin"];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AdminUserFormFields>({ defaultValues });
  const onSubmit: SubmitHandler<AdminUserFormFields> = async (data) => {
    const result = await postUserInfo(data);
    const type = result.result ? "success" : "error";
    if (result.result) {
      navigate("/");
    }
    showNotification({
      message: result.message,
      type: type,
    });
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Company Info
            </Typography>
          </Box>

          <TextField
            label={"First Name"}
            error={!!errors.firstName}
            placeholder={"Example"}
            {...register("firstName")}
          />
          <TextField
            label={"lastName"}
            {...register("lastName")}
            placeholder={"lastName"}
            error={!!errors.lastName}
            helperText={<ErrorMessage errors={errors} name="name" />}
          />
          <TextField
            label={"Email"}
            {...register("email", VALIDATORS.EMAIL)}
            error={!!errors.email}
            helperText={<ErrorMessage errors={errors} name="email" />}
            placeholder={"Enter company email"}
          />
          <TextField
            label={"location"}
            {...register("location", { required: false })}
            placeholder={"location"}
          />
          <Box sx={{ paddingBottom: "24px", paddingTop: "24px" }}>
            <Typography variant="h2" component="h2">
              Corporate information
            </Typography>
          </Box>
          <TextField
            select
            defaultValue={defaultValues?.role || "user"}
            label="role"
            {...register("role", { required: true })}
          >
            {roles.map((role) => (
              <MenuItem value={role}>{role}</MenuItem>
            ))}
          </TextField>
          <TextField label={"job"} {...register("job", { required: false })} placeholder={"job"} />
          <TextField
            label={"grade"}
            {...register("grade", { required: false })}
            placeholder={"grade"}
          />

          <TextField
            label={"Project"}
            {...register("project", { required: false })}
            placeholder={"project"}
          />

          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
