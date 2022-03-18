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
import { Delete, Photo } from "@mui/icons-material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import db from "../../services/firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { UserInfoDB } from "../../../../typescript-types/db.types";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase";
import { updateProfile } from "firebase/auth";

interface Event<T = EventTarget> {
  target: T;
  // ...
}
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
  const [avatar, setAvatar] = useState("");
  const { uid, user } = useAuth();

  useEffect(() => {
    setAvatar(user?.photoURL || "");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: preloadedValues,
  });

  const avatarUpload = (avatar: File) => {
    if (user) {
      const storageRef = ref(storage, `images/avatars/${uid}`);
      uploadBytes(storageRef, avatar).then((uploadTask) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(uploadTask.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(user, {
            photoURL: downloadURL,
          }).then(() => {
            setAvatar(downloadURL);
            console.log("update avatar");
          });
        });
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo: UserInfoDB = {
      about: data.about,
      lastName: data.lastName,
      firstName: data.firstName,
      linkedInUrl: data.linkedIn,
      phone: data.phone,
    };
    if (data.avatar?.length) {
      avatarUpload(data.avatar[0]);
    }
    await setDoc(doc(db.users, uid), userInfo);
  };

  const helper = errors.lastName ? "Error message" : "";

  function onDeletePhoto() {
    setAvatar("");
    console.log("delete photo");
  }

  function showPreview(event: Event<HTMLInputElement>) {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      setAvatar(src);
    }
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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <TextField
                      type={"file"}
                      sx={{ display: "none" }}
                      id="select-image"
                      {...register("avatar", { required: false, onChange: (e) => showPreview(e) })}
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
                            onDeletePhoto();
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
                  helperText={helper}
                  placeholder={"Enter your first name"}
                  {...register("firstName", { required: true })}
                />
                <TextField
                  label={"Last Name"}
                  {...register("lastName", { required: true })}
                  placeholder={"Enter your last name"}
                  error={!!errors.lastName}
                  helperText={helper}
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
            <Button variant={"outlined"}>Cancel</Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
