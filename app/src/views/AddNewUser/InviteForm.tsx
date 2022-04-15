import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { companyName } from "../../utils/url.utils";
import { InviteUserRequest, InviteUserResponce } from "../../../../functions/src/callable/user";
import { UserInfo } from "../../../../typescript-types/db.types";

const inviteUser = httpsCallable<InviteUserRequest, InviteUserResponce>(
  functions,
  "registration-inviteUser"
);

export function InviteForm() {
  const { handleSubmit, register } = useForm<UserInfo>();
  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    if (!companyName) {
      return;
    }

    const userInfo: UserInfo = {
      about: data.about || "",
      lastName: data.lastName || "",
      firstName: data.firstName || "",
      linkedInUrl: data.linkedInUrl || "",
      phone: data.phone || "",
      email: data.email,
    };

    const resultFromFunction = await inviteUser({
      domain: companyName,
      roles: {},
      userInfo,
    });
    const { result, error } = resultFromFunction.data;
    console.log("registerCompany result:", result);

    if (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      className="design-system-container"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ paddingBottom: "24px" }}>
          <Typography variant="h2" component="h2">
            Add User
          </Typography>
        </Box>
        <TextField label={"email"} {...register("email", { required: true })} />
        <TextField label={"firstName"} {...register("firstName")} />
        <TextField label={"lastName"} {...register("lastName")} />

        <Button type="submit">Add new User</Button>
      </form>
    </Container>
  );
}
