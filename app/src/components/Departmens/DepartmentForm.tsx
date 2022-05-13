import { Box, Button, Container, MenuItem, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { DepartmentInfo } from "../../../../typescript-types/db.types";
import { FullUserInfo } from "../../views/Users/AllUsers";

export interface User {
  name: string;
  uid: string;
  departmentID: string;
}

interface DepartmentFormProps {
  users: FullUserInfo[];
  createDepartment: (props: DepartmentInfo) => Promise<void>;
  defaultValue: {
    head: string;
    name: string;
  };
}

export function DepartmentForm({ users, createDepartment, defaultValue }: DepartmentFormProps) {
  const { register, handleSubmit } = useForm<DepartmentInfo>({
    defaultValues: {
      name: defaultValue.name,
      head: defaultValue.head,
    },
  });

  const onSubmit: SubmitHandler<DepartmentInfo> = (data) => {
    createDepartment(data);
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Department
            </Typography>
          </Box>
          <TextField
            label={"name"}
            {...register("name", { required: true })}
            placeholder={"name"}
          />
          <TextField
            select
            label="head"
            {...register("head", { required: true })}
            helperText="Please select your currency"
            defaultValue={defaultValue.head}
          >
            {users.map((option) => (
              <MenuItem value={option.id}>
                {option.firstName} {option.lastName}
              </MenuItem>
            ))}
          </TextField>
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              Save Changes
            </Button>
            <Button variant={"outlined"}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
