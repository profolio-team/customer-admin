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
import { useDocumentData } from "react-firebase-hooks/firestore";

import db from "../../services/firebase/firestore";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";

type Inputs = {
  avatar: FileList;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  phone: string;
  linkedIn: string;
};

export function UserInfoPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const { isAuthorized, uid } = useAuth();
  const [userInfo, loading, error] = useDocumentData(isAuthorized ? doc(db.users, uid) : null, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  console.log("userInfo", userInfo);

  useEffect(() => {
    if (!loading && userInfo) {
      setValue("firstName", userInfo?.firstName || "");
    }
  }, [userInfo, loading]);

  const [img, setImg] = useState(
    "https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2147483647&v=beta&t=i4Pp6zVfz5VAznPIik_ua4I75sKlu4yAdGKgHC9vpTo"
  );

  const onDeletePhoto = () => {
    setImg("");
    console.log("onDeletePhoto");
  };

  const onChangePhoto = () => {
    // const docRef = await addDoc(db.testDataTypeWithAllTypes, testData);
    // console.log("result after addDoc", docRef);

    setImg("https://www.jquery-az.com/wp-content/uploads/2015/12/2.2-HTML-img-src-relative.jpg");
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userData: UserInfo = {
      firstName: data.firstName,
    };

    await setDoc(doc(db.users, uid), {
      firstName: data.firstName,
    });

    // console.log(data);
  };
  const helper = errors.lastName ? "Error message" : "";

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
                    <TextField type={"file"} sx={{ display: "none" }} id="select-image" />
                    <label htmlFor={img ? "none" : "select-image"}>
                      <IconButton
                        sx={{ height: 160, width: 160 }}
                        component="span"
                        {...bindTrigger(popupState)}
                      >
                        <Avatar sx={{ width: 160, height: 160 }} src={img} />
                      </IconButton>
                    </label>
                    {img && (
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem
                          onClick={() => {
                            onChangePhoto();
                            popupState.close();
                          }}
                        >
                          <Photo sx={{ paddingRight: "5px" }} />
                          Change Photo
                        </MenuItem>
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
