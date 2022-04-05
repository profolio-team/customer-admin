import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { updateProfile, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AvatarForm, EAvatarState, IAvatarValue, INITIAL_AVATAR_VALUE } from "./avatarForm";
import { UserInfo } from "../../../../typescript-types/db.types";
import { storage } from "../../services/firebase";
import db from "../../services/firebase/firestore";
import {
  VALIDATION_HELPER_ONLY_LATTER,
  VALIDATION_HELPER_THIS_IS_REQUIRED,
  VALIDATION_REGEXP_ONLY_LATTER,
} from "./constants";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

export interface UserInfoForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  about?: string;
  phone?: string;
  linkedInUrl?: string;
}

interface UserInfoProps {
  userInfo: UserInfo;
  user: User;
  uid: string;
}

export function UserInfoForm({ userInfo, user, uid }: UserInfoProps): JSX.Element {
  const [avatarValue, setAvatarValue] = useState<IAvatarValue>(INITIAL_AVATAR_VALUE);
  const { showNotification } = useNotification();

  const defaultValues: UserInfoForm = {
    ...userInfo,
    email: user.email || "",
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UserInfoForm>({ defaultValues });

  const optionsInput = {
    required: VALIDATION_HELPER_THIS_IS_REQUIRED,
    pattern: {
      value: VALIDATION_REGEXP_ONLY_LATTER,
      message: VALIDATION_HELPER_ONLY_LATTER,
    },
  };
  const navigate = useNavigate();
  const cancel = () => {
    navigate("/");
  };

  const [disabled, setDisabled] = useState(isDirty);

  useEffect(() => {
    if (avatarValue.state === EAvatarState.NOT_CHANGED) {
      return;
    }
    setDisabled(true);
  }, [avatarValue]);

  const onSubmit: SubmitHandler<UserInfoForm> = async (data) => {
    const shouldUpdateAvatar = avatarValue.state === EAvatarState.SHOULD_UPLOAD_NEW_FILE;

    if (shouldUpdateAvatar && avatarValue.file) {
      await avatarUpdate(avatarValue.file);
    }

    if (avatarValue.state === EAvatarState.SHOULD_REMOVE) {
      await updateProfile(user, {
        photoURL: "",
      });
    }

    if (isDirty) {
      const userInfo: UserInfo = {
        about: data.about,
        lastName: data.lastName,
        firstName: data.firstName,
        linkedInUrl: data.linkedInUrl,
        phone: data.phone,
      };
      await setDoc(doc(db.users, uid), userInfo);
    }
    navigate("/");

    showNotification({
      message: "User information saved successfully",
      type: "success",
    });
  };

  async function avatarUpdate(avatarToUpdate: File) {
    const storageRef = ref(storage, `images/avatars/${uid}`);
    const uploadTask = await uploadBytes(storageRef, avatarToUpdate);
    const photoUrl = await getDownloadURL(uploadTask.ref);
    await updateProfile(user, {
      photoURL: photoUrl,
    });
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              User Info
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <AvatarForm
                avatarValue={avatarValue}
                setAvatarValue={setAvatarValue}
                url={user.photoURL}
              />
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
                <TextField
                  label={"First Name"}
                  error={!!errors.firstName}
                  helperText={<ErrorMessage errors={errors} name="firstName" />}
                  placeholder={"Enter your first name"}
                  {...register("firstName", { ...optionsInput })}
                />
                <TextField
                  label={"Last Name"}
                  {...register("lastName", { ...optionsInput })}
                  placeholder={"Enter your last name"}
                  error={!!errors.lastName}
                  helperText={<ErrorMessage errors={errors} name="lastName" />}
                />
              </Stack>
            </Grid>
          </Grid>
          <TextField
            label={"Email"}
            {...register("email", { required: false })}
            disabled={true}
            placeholder={"Placeholder"}
          />
          <TextField
            multiline
            rows={4}
            label={"About"}
            {...register("about", { required: false })}
            placeholder={"Provide short description about yourself"}
          />
          <TextField
            label={"Phone"}
            {...register("phone", { required: false })}
            placeholder={"+XXX (XX) XXX-XX-XX"}
          />
          <TextField
            label={"LinkedIn"}
            {...register("linkedInUrl", { required: false })}
            placeholder={"Enter your LinkedIn URL"}
          />
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button disabled={!disabled && !isDirty} variant={"contained"} type="submit">
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
