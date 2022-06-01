import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CompanyInfo } from "../../../../typescript-types/db.types";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../services/firebase/firestore";
import { ErrorMessage } from "@hookform/error-message";
import { VALIDATORS } from "../../utils/formValidator";
import { useNotification } from "../../hooks/useNotification";
import MuiPhoneNumber from "material-ui-phone-number";

interface CompanyInfoProps {
  companyInfo: CompanyInfo;
}

export function CompanyInfoForm({ companyInfo }: CompanyInfoProps): JSX.Element {
  const { showNotification } = useNotification();

  const defaultValues: CompanyInfo = {
    ...companyInfo,
  };

  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CompanyInfo>({ defaultValues });

  const navigate = useNavigate();
  const cancel = () => {
    navigate("/");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disabled, setDisabled] = useState(isDirty);

  const onSubmit: SubmitHandler<CompanyInfo> = async (data) => {
    if (isDirty) {
      const companyInfo: CompanyInfo = {
        ...data,
        logoUrl: defaultValues.logoUrl,
      };
      await updateDoc(doc(db.config, "companyInfo"), companyInfo);
    }

    navigate("/");
    showNotification({
      message: "Company information saved successfully",
      type: "success",
    });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Company Info
            </Typography>
          </Box>
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
                variant="outlined"
                margin="normal"
                error={Boolean(errors.phone)}
                helperText={<ErrorMessage errors={errors} name="phone" />}
              />
            )}
          />
          <TextField
            label={"Email"}
            {...register("email", VALIDATORS.EMAIL)}
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
