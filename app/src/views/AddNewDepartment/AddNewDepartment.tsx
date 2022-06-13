import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// import { httpsCallable } from "firebase/functions";
// import { functions } from "../../services/firebase";
// import { companyName } from "../../utils/url.utils";
// import {
//   InviteUserRequest,
//   InviteUserResponse,
// } from "../../../../functions/src/callable/invite/inviteUser";

// import { InputsHelper } from "../../components/InputsHelper/InputsHelper";
// import { checkDbMatch } from "../../utils/checkDbMatch";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { CopmanyStructure } from "../../../../typescript-types/db.types";
import { FORM_VALIDATORS } from "../../utils/formValidator";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";

// const inviteUser = httpsCallable<InviteUserRequest, InviteUserResponse>(
//   functions,
//   "invite-inviteUser"
// );

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiOutlinedInput-root": {
      height: "43px",
      padding: 0,
      paddingLeft: "8px",
    },
  },
}));

export function AddNewDepartment() {
  const classes = useStyles();
  const navigate = useNavigate();
  const cancel = () => {
    navigate("/");
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
  } = useForm<CopmanyStructure>();

  const optionsInput = {
    required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
    pattern: {
      value: FORM_VALIDATORS.LATERS_ONLY.REGEXP,
      message: FORM_VALIDATORS.LATERS_ONLY.ERROR_MESSAGE,
    },
  };
  const [disabled, setDisabled] = useState(isDirty);

  const onSubmit: SubmitHandler<CopmanyStructure> = async (data) => {
    // Для теста
    console.log(data);

    //     if (!companyName) {
    //       return;
    //     }
    //   if (isDirty) {
    //     const companyStructure: CopmanyStructure = {
    //       departmentName: data.departmentName || "",
    //       head: data.head || "",
    //     };
    //      await setDoc(doc(db.users, uid), CopmanyStructure);
    //   }
    //     const resultFromFunction = await inviteUser({
    //       domain: companyName,
    //       roles: {
    //         isAdmin: true,
    //         isOwner: true,
    //       },
    //       companyStructure,
    //     });
    //     const { error } = resultFromFunction.data;
    //     console.log("registerCompany error:", error);
  };

  // Тестовый массив
  const arrayHeadOfDepartment = [{ title: "Alex" }, { title: "Jack" }, { title: "Victor" }];

  return (
    <Container
      maxWidth="xl"
      className="design-system-container"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Add Department
            </Typography>
          </Box>
          <TextField
            label={"Department name"}
            {...register("departmentName", { ...optionsInput })}
            placeholder={"Enter department name"}
            onBlur={(e) => {
              // Тестовый вариант
              if (e.target.value === "testDepartment") {
                setError("departmentName", {
                  type: "exist",
                  message: "The department name already exist",
                });
              } else {
                setDisabled(false);
              }
              // checkDbMatch("departmentName", e.target.value).then((data) => {
              //   if (data > 0) {
              //     setError("departmentName", {
              //       type: "dep",
              //       message: "The department name already exist",
              //     });
              //     setDisabled(false);
              //   }
              // });
            }}
            error={!!errors.departmentName}
            helperText={<ErrorMessage errors={errors} name="departmentName" />}
          />
          <Autocomplete
            options={arrayHeadOfDepartment}
            getOptionLabel={(arrayHeadOfDepartment) => arrayHeadOfDepartment.title}
            selectOnFocus
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Head of department"}
                {...register("head", { ...optionsInput })}
                error={!!errors.head}
                placeholder={"Enter name of head of department"}
                helperText={<ErrorMessage errors={errors} name="head" />}
                className={classes.root}
              />
            )}
          />
          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button disabled={!disabled && !isDirty} variant={"contained"} type="submit">
              Create Department
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
