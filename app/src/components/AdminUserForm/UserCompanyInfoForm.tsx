import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, MenuItem, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { VALIDATORS } from "../../utils/formValidator";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../../../typescript-types/db.types";
import MuiPhoneNumber from "material-ui-phone-number";

interface UserFormProps {
  pageTitle: string;
  postUserInfo: (props: UserInfo) => Promise<{ result: boolean; message: string }>;
  defaultValues?: UserInfo;
}

export function UserCompanyInfoForm({ postUserInfo, defaultValues, pageTitle }: UserFormProps) {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const roles = ["user", "admin"];
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UserInfo>({ defaultValues });
  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    const { result, message } = await postUserInfo(data);
    const type = result ? "success" : "error";
    if (result) {
      navigate("/");
    }
    showNotification({
      message,
      type: type,
    });
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              {pageTitle}
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
          <Box sx={{ paddingBottom: "24px", paddingTop: "24px" }}>
            <Typography variant="h2" component="h2">
              Personal information
            </Typography>
          </Box>
          <TextField
            multiline
            rows={4}
            label={"About"}
            {...register("about", { required: false })}
            placeholder={"Provide short description about yourself"}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <MuiPhoneNumber
                name={name}
                value={value}
                onChange={onChange}
                id="contactPhoneNumber"
                defaultCountry={"ru"}
                style={{ width: "100%" }}
                label="Phone"
                variant="outlined"
                margin="normal"
                error={Boolean(errors.phone)}
                helperText={<ErrorMessage errors={errors} name="phone" />}
              />
            )}
          />
          <TextField
            label={"LinkedIn"}
            {...register("linkedInUrl", { required: false })}
            placeholder={"Enter your LinkedIn URL"}
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
