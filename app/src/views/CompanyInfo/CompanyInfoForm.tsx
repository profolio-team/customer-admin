import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import React, { ChangeEvent, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  VALIDATION_HELPER_ONLY_LATTER,
  VALIDATION_REGEXP_ONLY_LATTER,
} from "../UserInfo/constants";
import { doc, setDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { CompanyInfoDB } from "../../../../typescript-types/db.types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../services/firebase";

export interface InputsCompanyInfo {
  template: string;
  name: string;
  phone: string;
  email: string;
  about: string;
  logoUrl: string;
}

interface CompanyInfoFormProps {
  preloadedValues: InputsCompanyInfo;
  uid: string;
}

enum EAvatarState {
  NOT_CHANGED = "NOT_CHANGED",
  SHOULD_UPLOAD_NEW_FILE = "SHOULD_UPLOAD_NEW_FILE",
}

interface LOGOVALUE {
  state: EAvatarState;
  file: File | null;
}

const INITIAL_LOGO_VALUE: LOGOVALUE = {
  state: EAvatarState.NOT_CHANGED,
  file: null,
};

export function CompanyInfoForm({ preloadedValues, uid }: CompanyInfoFormProps): JSX.Element {
  const [defaultValues, setDefaultValues] = useState(preloadedValues);
  const [avatarValue, setAvatarValue] = useState<LOGOVALUE>(INITIAL_LOGO_VALUE);
  const [logoUrls, setLogoUrls] = useState(preloadedValues.logoUrl);
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<InputsCompanyInfo>({
    defaultValues: defaultValues,
  });
  const onFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    setAvatarValue({ state: EAvatarState.SHOULD_UPLOAD_NEW_FILE, file });
  };

  const cancelChanges = () => {
    debugger;
    reset(defaultValues);
  };
  const onSubmit: SubmitHandler<InputsCompanyInfo> = async (data) => {
    debugger;

    if (avatarValue.state === EAvatarState.SHOULD_UPLOAD_NEW_FILE) {
      if (!avatarValue.file) {
        return;
      }
      await logoUpdate(avatarValue.file);
    }

    async function logoUpdate(avatarToUpdate: File) {
      const storageRef = ref(storage, `images/logos/${uid}`);
      const uploadTask = await uploadBytes(storageRef, avatarToUpdate);
      const logoUrl = await getDownloadURL(uploadTask.ref);
      setLogoUrls(logoUrl);

      const CompanyInfo: CompanyInfoDB = {
        about: data.about,
        email: data.email,
        name: data.name,
        phone: data.phone,
        template: data.template,
        logoUrl: logoUrl,
      };

      await setDoc(doc(db.config, "CompanyInfo"), CompanyInfo);
    }

    setDefaultValues({ ...data });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} paddingTop={"24px"}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2" color={"101213"}>
              Company Info
            </Typography>
          </Box>
          <TextField
            label={"Portfolio template"}
            helperText={
              !errors.template ? (
                "This template is used for the portfolio of all employees"
              ) : (
                <ErrorMessage errors={errors} name={"template"} />
              )
            }
            error={!!errors.template}
            placeholder={"Placeholder"}
            {...register("template", {
              required: "Message on required",
              pattern: {
                value: VALIDATION_REGEXP_ONLY_LATTER,
                message: VALIDATION_HELPER_ONLY_LATTER,
              },
            })}
          />
          <TextField
            label={"Company name"}
            placeholder={"Enter company name"}
            {...register("name")}
          />
          <TextField label={"Phone"} placeholder={"+XXX (XX) XXX XX XX"} {...register("phone")} />
          <TextField label={"Email"} placeholder={"Enter company email"} {...register("email")} />

          <TextField
            label={"About the company"}
            placeholder={
              "Provide information to introduce company’s activities, advantages and business goals "
            }
            {...register("about")}
            multiline
            rows={4}
          />
          <TextField
            label={"Company logo"}
            placeholder={"Choose file"}
            type={"file"}
            onChange={onFileUpdate}
            helperText={
              "For better portfolio look, use files with a transparent background (.png/.svg)"
            }
          />
          <img alt={" "} width={"508px"} src={logoUrls} />
          <Stack paddingTop={"40px"} direction="row" spacing={2}>
            <Button variant={"contained"} type={"submit"}>
              Save Changes
            </Button>
            <Button variant={"outlined"} type={"submit"} onClick={cancelChanges}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
