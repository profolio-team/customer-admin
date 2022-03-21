import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  VALIDATION_HELPER_ONLY_LATTER,
  VALIDATION_REGEXP_ONLY_LATTER,
} from "../UserInfo/constants";
import { doc, setDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";

export interface InputsCompanyInfo {
  template: string;
  name: string;
  phone: string;
  email: string;
  about: string;
  logo: FileList | string;
}

interface CompanyInfoFormProps {
  preloadedValues: InputsCompanyInfo;
}

export function CompanyInfoForm({ preloadedValues }: CompanyInfoFormProps): JSX.Element {
  const [defaultValues, setDefaultValues] = useState(preloadedValues);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsCompanyInfo>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<InputsCompanyInfo> = async (data) => {
    if (!(JSON.stringify(defaultValues) === JSON.stringify(data))) {
      await setDoc(doc(db.config, "CompanyInfo"), data);
      setDefaultValues(data);
    }
  };

  const cancelChanges = () => {
    reset(defaultValues);
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
            {...register("logo")}
            helperText={
              "For better portfolio look, use files with a transparent background (.png/.svg)"
            }
          />
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
