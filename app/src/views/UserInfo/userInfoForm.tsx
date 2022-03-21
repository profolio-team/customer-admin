import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import db from "../../services/firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { UserInfoDB } from "../../../../typescript-types/db.types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { updateProfile, User } from "firebase/auth";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Delete, Photo } from "@mui/icons-material";
import { ErrorMessage } from "@hookform/error-message";
import {
  VALIDATION_HELPER_ONLY_LATTER,
  VALIDATION_HELPER_THIS_IS_REQUIRED,
  VALIDATION_REGEXP_ONLY_LATTER,
} from "./constants";

export interface Inputs {
  avatar: FileList | string;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  phone: string;
  linkedIn: string;
}

interface UserInfoProps {
  preloadedValues: Inputs;
  user: User;
  uid: string;
}

export function UserInfoForm({ preloadedValues, user, uid }: UserInfoProps): JSX.Element {
  const [avatar, setAvatar] = useState(user?.photoURL || "");
  const [defaultValues, setDefaultValues] = useState<Inputs>(preloadedValues);
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });
  const optionsInput = {
    required: VALIDATION_HELPER_THIS_IS_REQUIRED,
    pattern: {
      value: VALIDATION_REGEXP_ONLY_LATTER,
      message: VALIDATION_HELPER_ONLY_LATTER,
    },
  };
  const showPreview = (file: File) => {
    const src = URL.createObjectURL(file);
    setAvatar(src);
  };
  const clearFileList = () => {
    const file = new File([""], "delete", { type: "image/png" });
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt.files;
  };
  const showPreviewDeletedPhoto = () => {
    setValue("avatar", clearFileList());
    setAvatar("");
  };
  const cancelChanges = () => {
    reset(defaultValues);
    setAvatar(user.photoURL || "");
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!(JSON.stringify(defaultValues) === JSON.stringify(data))) {
      if (typeof data.avatar !== "string") {
        await avatarUpdate(data.avatar[0]);
        setValue("avatar", "");
      }
      const userInfo: UserInfoDB = {
        about: data.about,
        lastName: data.lastName,
        firstName: data.firstName,
        linkedInUrl: data.linkedIn,
        phone: data.phone,
      };
      await setDoc(doc(db.users, uid), userInfo);
      setDefaultValues({ ...data, avatar: "" });
    }
  };

  async function avatarUpdate(avatarToUpdate: File) {
    if (avatarToUpdate.size !== 0) {
      const storageRef = ref(storage, `images/avatars/${uid}`);
      const uploadTask = await uploadBytes(storageRef, avatarToUpdate);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      await updateProfile(user, { photoURL: downloadURL });
      setAvatar(downloadURL);
    } else {
      await updateProfile(user, {
        photoURL: "",
      });
    }
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "24px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              User Info
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <TextField
                      type={"file"}
                      sx={{ display: "none" }}
                      id="select-image"
                      {...register("avatar", {
                        required: false,
                        onChange: (e) => showPreview(e.target.files[0]),
                      })}
                    />
                    <label htmlFor={avatar ? "" : "select-image"}>
                      <IconButton
                        sx={{ height: 160, width: 160 }}
                        component="span"
                        {...bindTrigger(popupState)}
                      >
                        <Avatar sx={{ width: 160, height: 160 }} src={avatar} />
                      </IconButton>
                    </label>
                    {avatar && (
                      <Menu {...bindMenu(popupState)}>
                        <label htmlFor="select-image">
                          <MenuItem onClick={popupState.close}>
                            <Photo sx={{ paddingRight: "5px" }} />
                            Change Photo
                          </MenuItem>
                        </label>
                        <MenuItem
                          onClick={() => {
                            showPreviewDeletedPhoto();
                            popupState.close();
                          }}
                        >
                          <Delete sx={{ paddingRight: "5px" }} />
                          Delete Photo
                        </MenuItem>
                      </Menu>
                    )}
                  </>
                )}
              </PopupState>
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
            {...register("linkedIn", { required: false })}
            placeholder={"Enter your LinkedIn URL"}
          />
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              Save Changes
            </Button>
            <Button variant={"outlined"} onClick={cancelChanges}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
