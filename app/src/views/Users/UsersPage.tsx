import MaterialTable from "material-table";
import { Autocomplete, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { UserInfo } from "../../../../typescript-types/db.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutocompleteName } from "../../components/AutocompleteName";
import { AutocompleteLocation } from "../../components/AutocompleteLocation";
import { useState } from "react";
import { limit, query, where } from "firebase/firestore";

interface UserColumn {
  title: string;
  field: keyof UserInfo;
}

export interface FilteringFields {
  name?: string;
  job?: string;
  grade?: string;
  location?: string;
  role?: string;
  department?: string;
  head?: string;
  isActive?: boolean;
}

export function UsersPage() {
  const navigate = useNavigate();
  const [filteringParams] = useDocumentData(db.documents.config.userParams);
  const defaultValues: FilteringFields = {};

  const [q, setQ] = useState(query(db.collections.users, limit(5)));

  const [usersCollection] = useCollection(q);

  const { control, handleSubmit, setValue } = useForm<FilteringFields>({ defaultValues });
  if (!filteringParams) {
    return <Loader />;
  }

  const columns: UserColumn[] = [
    { title: "Email", field: "email" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Phone", field: "phone" },
  ];

  const onSubmit: SubmitHandler<FilteringFields> = async (data) => {
    const name = Object.entries(data).filter((p) => p[0] === "name")[0];
    const filtering = Object.entries(data).filter(
      (p) => p[0] !== "name" && (typeof p[1] === "string" || typeof p[1] === "boolean")
    );

    const wheres = filtering.map((f) => where(f[0], "==", f[1]));
    if (typeof name[1] === "string") {
      const fullName = name[1].split(" ");
      const whereFirst = where("firstName", "==", fullName[0]);
      const whereLast = where("lastName", "==", fullName[1]);
      wheres.push(whereFirst);
      wheres.push(whereLast);
    }
    setQ(query(db.collections.users, ...wheres, limit(5)));
  };
  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Users
        </Typography>
        <Button variant="contained" onClick={() => navigate("invite")}>
          Create New User
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <AutocompleteName control={control} />
            <Autocomplete
              disablePortal
              id="jobs"
              options={filteringParams.jobs}
              onChange={(e, options) => setValue("job", options ? options : undefined)}
              renderInput={(params) => <TextField {...params} label="Job" />}
            />

            <Autocomplete
              // sx
              disablePortal
              id="grades"
              options={filteringParams.grades}
              onChange={(e, options) => setValue("grade", options ? options : undefined)}
              renderInput={(params) => <TextField {...params} label="Grade" />}
            />
            <AutocompleteLocation control={control} fieldName={"location"} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Autocomplete
              disablePortal
              id="roles"
              options={filteringParams.roles}
              onChange={(e, options) => setValue("role", options ? options : undefined)}
              renderInput={(params) => <TextField {...params} label="Role" />}
            />
            {/*<TextField {...register('department')} label={'Department'}/>*/}
            {/*<TextField {...register('head')} label={'Head'}/>*/}
            <Autocomplete
              disablePortal
              id="status"
              options={[
                {
                  label: "Active",
                  value: true,
                },
                {
                  label: "Inactive",
                  value: false,
                },
              ]}
              onChange={(e, options) => setValue("isActive", options ? options.value : undefined)}
              renderInput={(params) => <TextField {...params} label="Role" />}
            />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Button variant={"contained"} type={"submit"}>
              Filter
            </Button>
            <Button variant={"outlined"}>Clear Filter</Button>
          </Stack>
        </Stack>
      </form>
      {usersCollection && (
        <MaterialTable
          title={"Users"}
          columns={columns}
          data={usersCollection.docs.map((usersDoc) => usersDoc.data())}
        />
      )}
    </Container>
  );
}
