import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, Grid, MenuItem, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { CorporateUserInfo } from "../../../../typescript-types/db.types";
import { ErrorMessage } from "@hookform/error-message";
import { VALIDATORS } from "../../utils/formValidator";
import { DepartmentFields } from "./UsersPage";
import { FullUserInfo } from "./AllUsers";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  postUserInfo: (props: CorporateUserInfo) => Promise<void>;
  departments: DepartmentFields[];
  defaultValues?: FullUserInfo;
}

export function UserForm({ postUserInfo, departments, defaultValues }: UserFormProps) {
  const roles = ["user", "admin"];
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CorporateUserInfo>({ defaultValues });
  const onSubmit: SubmitHandler<CorporateUserInfo> = async (data) => {
    const userInfo: CorporateUserInfo = {
      lastName: data.lastName || "",
      firstName: data.firstName || "",
      email: data.email,
      job: data.job || "",
      departmentID: data.departmentID || "",
      grade: data.grade || "",
      location: data.location || "",
      project: data.project || "",
      role: data.role || "",
      isActive: data.isActive || false,
    };
    postUserInfo(userInfo);
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Create new user
            </Typography>
          </Box>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h3" component="h2">
              Personal information
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              img
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
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
              </Stack>
            </Grid>
          </Grid>
          <TextField
            label={"Email"}
            {...register("email", VALIDATORS.EMAIL)}
            error={!!errors.email}
            helperText={
              errors.email ? (
                <ErrorMessage errors={errors} name="email" />
              ) : (
                "The user will receive an invitation to this email"
              )
            }
            placeholder={"Enter company email"}
          />
          <TextField
            label={"location"}
            {...register("location", { required: false })}
            placeholder={"location"}
          />
          <Box sx={{ paddingBottom: "24px", paddingTop: "24px" }}>
            <Typography variant="h3" component="h2">
              Corporate information
            </Typography>
          </Box>
          <TextField
            select
            defaultValue={defaultValues?.role || "user"}
            label="Profolio system role"
            {...register("role", { required: true })}
          >
            {roles.map((role) => (
              <MenuItem value={role}>{role}</MenuItem>
            ))}
          </TextField>
          <TextField
            label={"Job title"}
            {...register("job", { required: false })}
            placeholder={"job"}
          />
          <TextField
            label={"Grade"}
            {...register("grade", { required: false })}
            placeholder={"grade"}
          />
          <TextField
            select
            label="Department"
            defaultValue={defaultValues?.departmentID || ""}
            {...register("departmentID", { required: false })}
          >
            {departments.map((department) => {
              return <MenuItem value={department.id}>{department.name}</MenuItem>;
            })}
          </TextField>

          <TextField
            label={"Project"}
            {...register("project", { required: false })}
            placeholder={"project"}
          />

          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              {defaultValues ? "SaveChanges" : "Add User"}
            </Button>
            <Button variant={"outlined"} onClick={() => navigate("/user/all")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
