import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { companyName } from "../../utils/url.utils";
import { checkDbMatch } from "../../utils/checkDbMatch";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { DepartmentInfo } from "../../../../typescript-types/db.types";
import { FORM_VALIDATORS } from "../../utils/formValidator";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";

import { useCollection } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { doc, setDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { useNotification } from "../../hooks/useNotification";

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
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [head, setHead] = useState("-");
  const classes = useStyles();

  const cancel = () => {
    navigate("/company-structure");
  };

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setError,
  } = useForm<DepartmentInfo>();

  const optionsInput = {
    required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
    pattern: {
      value: FORM_VALIDATORS.LATERS_ONLY.REGEXP,
      message: FORM_VALIDATORS.LATERS_ONLY.ERROR_MESSAGE,
    },
  };
  const [disabled, setDisabled] = useState(isDirty);
  const [result, setResult] = useState(true);

  const clearHeadId = async (docId: string) => {
    await updateDoc(doc(db.collections.departments, docId), {
      headId: "",
    });
  };

  const onSubmit: SubmitHandler<DepartmentInfo> = async () => {
    const message = result ? "the department has been created" : "Somthing was wrong...";
    const type = result ? "success" : "error";
    if (type === "success") {
      navigate("/company-structure");
    }
    showNotification({
      message,
      type: type,
    });

    if (!companyName) {
      return;
    }
    if (isDirty && disabled) {
      const q = query(db.collections.departments, where("headId", "==", head));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        clearHeadId(doc.id);
      });
      const docs = doc(db.collections.departments);
      await setDoc(docs, {
        name: value,
        headId: head,
      });
      await updateDoc(doc(db.collections.users, head), {
        departmentId: docs.id,
      });
    }
  };

  const [usersCollection] = useCollection(db.collections.users);

  if (!usersCollection) {
    return <Loader />;
  }

  const users = usersCollection.docs.map((usersDoc) => ({
    id: usersDoc.id,
    name: usersDoc.data().lastName + " " + usersDoc.data().firstName,
  }));

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
            {...register("name", { ...optionsInput })}
            placeholder={"Enter department name"}
            onBlur={(e) => {
              setValue(e.target.value);
              checkDbMatch("name", e.target.value).then((data) => {
                if (data > 0) {
                  setError("name", {
                    type: "dep",
                    message: "The department name already exist",
                  });
                  setResult(false);
                  setDisabled(false);
                } else {
                  setResult(true);
                  setDisabled(true);
                }
              });
            }}
            error={!!errors.name}
            helperText={<ErrorMessage errors={errors} name="name" />}
          />
          <Autocomplete
            noOptionsText={"User not found"}
            limitTags={4}
            options={users}
            disablePortal
            getOptionLabel={(users) => users.name}
            selectOnFocus
            sx={{
              oveeflow: "hidden",
            }}
            componentsProps={{
              paper: {
                sx: {
                  maxHeight: 179,
                  overflow: "hidden",
                },
              },
            }}
            onChange={(e, value) => {
              if (value) {
                const id: string = value.id;
                setHead(id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Head of department"}
                {...register("headId")}
                placeholder={"Enter name of head of department"}
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
