import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import db from "../../services/firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { UserInfoDB } from "../../../../typescript-types/db.types";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase";
import { updateProfile } from "firebase/auth";
import { AvatarInput } from "./avatar.input";

export interface Inputs {
  avatar?: FileList;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  phone: string;
  linkedIn: string;
}

interface preloadedValuesProps {
  preloadedValues: Inputs;
}

export function UserInfoForm({ preloadedValues }: preloadedValuesProps): JSX.Element {
  const { uid, user } = useAuth();

  const methods = useForm<Inputs>({
    defaultValues: preloadedValues,
  });

  const avatarUpdate = (avatarToUpdate: File) => {
    if (user) {
      // if () {
      const storageRef = ref(storage, `images/avatars/${uid}`);
      uploadBytes(storageRef, avatarToUpdate).then((uploadTask) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(uploadTask.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(user, {
            photoURL: downloadURL,
          }).then(() => {
            console.log("update avatarToUpdate");
          });
        });
      });
      // }
      // else {
      //   updateProfile(user, {
      //     photoURL: "",
      //   }).then(() => {
      //     console.log("delete avatar");
      //   });
      // }
    }
  };

  const helper = methods.formState.errors.lastName ? "Error message" : "";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("отправка");
    const userInfo: UserInfoDB = {
      about: data.about,
      lastName: data.lastName,
      firstName: data.firstName,
      linkedInUrl: data.linkedIn,
      phone: data.phone,
    };
    await setDoc(doc(db.users, uid), userInfo);
    if (data.avatar?.length) {
      avatarUpdate(data.avatar[0]);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
            <Box sx={{ paddingBottom: "24px" }}>
              <Typography variant="h2" component="h2">
                User Info
              </Typography>
            </Box>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                {user && <AvatarInput {...user} />}
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
                  <TextField
                    label={"First Name"}
                    error={!!methods.formState.errors.firstName}
                    helperText={helper}
                    placeholder={"Enter your first name"}
                    {...methods.register("firstName", { required: true })}
                  />
                  <TextField
                    label={"Last Name"}
                    {...methods.register("lastName", { required: true })}
                    placeholder={"Enter your last name"}
                    error={!!methods.formState.errors.lastName}
                    helperText={helper}
                  />
                </Stack>
              </Grid>
            </Grid>
            <TextField
              label={"Email"}
              {...methods.register("email", { required: false })}
              disabled={true}
              placeholder={"Placeholder"}
            />
            <TextField
              multiline
              rows={4}
              label={"About"}
              {...methods.register("about", { required: false })}
              placeholder={"Provide short description about yourself"}
            />
            <TextField
              label={"Phone"}
              {...methods.register("phone", { required: false })}
              placeholder={"+XXX (XX) XXX-XX-XX"}
            />
            <TextField
              label={"LinkedIn"}
              {...methods.register("linkedIn", { required: false })}
              placeholder={"Enter your LinkedIn URL"}
            />
            <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
              <Button variant={"contained"} type="submit">
                Save Changes
              </Button>
              <Button variant={"outlined"}>Cancel</Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
}
