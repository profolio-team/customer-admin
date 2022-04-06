import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { getFullUrlWithDomain, getRootFullUrl } from "../../utils/url.utils";

interface inviteUserResult {
  result: string;
  verifyEmailLink: string;
  error: string;
}

const inviteUser = httpsCallable(functions, "registration-inviteUser");

interface IInviteForm {
  email: string;
  isAdmin: boolean;
  firstName?: string;
  lastName?: string;
}

export function InviteForm() {
  const [url, setUrl] = useState("url");
  const { handleSubmit, register } = useForm<IInviteForm>();
  const onSubmit: SubmitHandler<IInviteForm> = async (data) => {
    const domain = window.location.hostname.split(".")[0];
    const rootDomainUrl = getRootFullUrl();
    const fullDomainUrl = getFullUrlWithDomain(domain);
    const claims = {
      domain,
      isAdmin: data.isAdmin,
    };
    const userInfo = {
      ...data,
    };
    const resultFromFunction = await inviteUser({
      rootDomainUrl,
      fullDomainUrl,
      claims,
      userInfo,
    });
    const { result, error, verifyEmailLink } = resultFromFunction.data as inviteUserResult;
    console.log("registerCompany result:", result);

    if (error) {
      console.log(error);
    } else {
      setUrl(verifyEmailLink);
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

        <FormGroup>
          <FormControlLabel control={<Checkbox {...register("isAdmin")} />} label="isAdmin" />
        </FormGroup>

        <Button type="submit">Add new User</Button>
        <Box>
          <TextField value={url} placeholder={"Url..."} />
        </Box>
      </form>
    </Container>
  );
}
