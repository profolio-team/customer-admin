import { ErrorMessage } from "@hookform/error-message";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { updateProfile, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  ImageForm,
  ImageState,
  ImageValue,
  INITIAL_IMAGE_VALUE,
} from "../../components/ImageForm/ImageForm";
import { UserInfo } from "../../../../typescript-types/db.types";
import db from "../../services/firebase/firestore";

import { FORM_VALIDATORS } from "../../utils/formValidator";

import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { uploadFile } from "../../services/firebase/uploadFile";
import MuiPhoneNumber from "material-ui-phone-number";

interface UserInfoProps {
  userInfo: UserInfo;
  user: User;
  uid: string;
}

export function UserInfoForm({ userInfo, user, uid }: UserInfoProps): JSX.Element {
  const [avatar, setAvatar] = useState<ImageValue>(INITIAL_IMAGE_VALUE);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const defaultValues: UserInfo = {
    ...userInfo,
  };

  const {
    register,
    formState: { errors, isDirty },
    control,
    handleSubmit,
  } = useForm<UserInfo>({ defaultValues });

  const optionsInput = {
    required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
    pattern: {
      value: FORM_VALIDATORS.LATERS_ONLY.REGEXP,
      message: FORM_VALIDATORS.LATERS_ONLY.ERROR_MESSAGE,
    },
  };

  const cancel = () => {
    navigate("/");
  };

  const [disabled, setDisabled] = useState(isDirty);

  useEffect(() => {
    if (avatar.state === ImageState.NOT_CHANGED) {
      return;
    }
    setDisabled(true);
  }, [avatar]);

  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    const shouldUpdateAvatar = avatar.state === ImageState.SHOULD_UPLOAD_NEW_FILE;

    if (shouldUpdateAvatar && avatar.file) {
      const photoUrl = await uploadFile(`images/avatars/${uid}`, avatar.file);
      await updateProfile(user, {
        photoURL: photoUrl,
      });
    }

    if (avatar.state === ImageState.SHOULD_REMOVE) {
      await updateProfile(user, {
        photoURL: "",
      });
    }

    if (isDirty) {
      const userInfo: UserInfo = {
        about: data.about || "",
        lastName: data.lastName || "",
        firstName: data.firstName || "",
        linkedInUrl: data.linkedInUrl || "",
        phone: data.phone || "",
        email: defaultValues.email,
      };
      await setDoc(doc(db.users, uid), userInfo);
    }
    navigate("/");

    showNotification({
      message: "User information saved successfully",
      type: "success",
    });
  };
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
              <ImageForm imageValue={avatar} setImageValue={setAvatar} url={user.photoURL} />
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
                autoComplete="Phone"
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
