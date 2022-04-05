import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AvatarForm,
  EAvatarState,
  IAvatarValue,
  INITIAL_AVATAR_VALUE,
} from "../../components/ImageForm/ImageForm";
import { CompanyInfo } from "../../../../typescript-types/db.types";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { ErrorMessage } from "@hookform/error-message";
import { FORM_VALIDATORS } from "../../utils/formValidator";

export interface ICompanyInfoForm {
  name?: string;
  phone?: string;
  email?: string;
  about?: string;
  logoUrl?: string;
  template?: string;
}

interface CompanyInfoProps {
  companyInfoDB: CompanyInfo;
}

export function CompanyInfoForm({ companyInfoDB }: CompanyInfoProps): JSX.Element {
  const [avatarValue, setAvatarValue] = useState<IAvatarValue>(INITIAL_AVATAR_VALUE);

  const defaultValues: ICompanyInfoForm = {
    ...companyInfoDB,
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<ICompanyInfoForm>({ defaultValues });

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

  const onSubmit: SubmitHandler<ICompanyInfoForm> = async (data) => {
    const shouldUpdateAvatar = avatarValue.state === EAvatarState.SHOULD_UPLOAD_NEW_FILE;

    if (shouldUpdateAvatar && avatarValue.file) {
      await avatarUpdate(avatarValue.file);
    }
    if (avatarValue.state === EAvatarState.SHOULD_REMOVE) {
      await updateDoc(doc(db.config, "CompanyInfo"), { logoUrl: "" });
    }

    if (isDirty) {
      const companyInfo: CompanyInfo = {
        name: data.name,
        email: data.email,
        about: data.about,
        phone: data.phone,
        template: data.template,
      };
      await updateDoc(doc(db.config, "CompanyInfo"), companyInfo);
    }
    navigate("/");
  };

  async function avatarUpdate(avatarToUpdate: File) {
    const storageRef = ref(storage, `images/logos/${Date.now()}`);
    const uploadTask = await uploadBytes(storageRef, avatarToUpdate);
    const logoUrl = await getDownloadURL(uploadTask.ref);
    await updateDoc(doc(db.config, "CompanyInfo"), { logoUrl: logoUrl });
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Company Info
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <AvatarForm
                avatarValue={avatarValue}
                setAvatarValue={setAvatarValue}
                url={companyInfoDB.logoUrl || ""}
              />
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
                <TextField
                  label={"Portfolio template"}
                  error={!!errors.template}
                  helperText={"This template is used for the portfolio of all employees"}
                  placeholder={"Example"}
                  {...register("template")}
                />
                <TextField
                  label={"Company name"}
                  {...register("name", {
                    maxLength: {
                      value: 100,
                      message: "The valid company name shall consist of max 100 symbols",
                    },
                  })}
                  placeholder={"Enter company name"}
                  error={!!errors.name}
                  helperText={<ErrorMessage errors={errors} name="name" />}
                />
              </Stack>
            </Grid>
          </Grid>
          <TextField
            label={"Phone"}
            {...register("phone", { required: false })}
            placeholder={"+XXX (XX) XXX XX XX"}
          />
          <TextField
            label={"Email"}
            {...register("email", {
              required: false,
              pattern: {
                value: FORM_VALIDATORS.EMAIL.REGEXP,
                message: FORM_VALIDATORS.EMAIL.ERROR_MESSAGE,
              },
            })}
            error={!!errors.email}
            helperText={<ErrorMessage errors={errors} name="email" />}
            placeholder={"Enter company email"}
          />
          <TextField
            multiline
            rows={4}
            label={"About the company"}
            {...register("about", { required: false })}
            placeholder={
              "Provide information to introduce company’s activities, advantages and business goals "
            }
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
