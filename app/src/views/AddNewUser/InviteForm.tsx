import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { companyName } from "../../utils/url.utils";
import {
  InviteUserRequest,
  InviteUserResponse,
} from "../../../../functions/src/callable/invite/inviteUser";
import { UserInfo } from "../../../../typescript-types/db.types";

const inviteUser = httpsCallable<InviteUserRequest, InviteUserResponse>(
  functions,
  "invite-inviteUser"
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
      roles: {
        isAdmin: true,
        isOwner: true,
      },
      userInfo,
    });
    const { error } = resultFromFunction.data;
    console.log("registerCompany error:", error);

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
