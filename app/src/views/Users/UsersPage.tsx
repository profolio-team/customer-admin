import MaterialTable from "material-table";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCollectionOnce, useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutocompleteName } from "../../components/AutocompleteName";
import { AutocompleteLocation } from "../../components/AutocompleteLocation";
import { useEffect, useState } from "react";
import { limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { ColumnForUsersTable } from "./ColumnForUsersTable";
import { ControlledAutocomplete } from "./ControlledAutocomplete";

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

  const [wheres, setWheres] = useState([
    where("firstName", ">=", "A"),
    where("firstName", "<=", "Z"),
  ]);

  const [isLastClickBack, setIsLastClickBack] = useState(false);

  const [isFiltering, setIsFiltering] = useState(true);

  const [disableNext, setDisableNext] = useState(false);

  const [disableBack, setDisableBack] = useState(true);

  const [q, setQ] = useState(query(db.collections.users, ...wheres, limit(6)));

  const [usersCollection, loading] = useCollectionOnce(q);
  useEffect(() => {
    if (usersCollection && usersCollection.docs.length < 6) {
      isLastClickBack ? setDisableBack(true) : setDisableNext(true);
    }
    if (isFiltering) {
      setDisableBack(true);
      setDisableNext(false);
      if (usersCollection && usersCollection.docs.length < 6) {
        setDisableNext(true);
      }
    }
  }, [loading]);

  useEffect(() => {
    console.log("wheres: ");
    console.log(usersCollection?.docs.length);
    console.log(usersCollection?.docs.map((d) => d.data()));
    if (usersCollection && usersCollection.docs.length < 6) {
      setDisableBack(true);
      setDisableNext(true);
    }
    if (usersCollection?.docs.length === 6) {
      setDisableNext(false);
    }
  }, [wheres]);

  const { control, handleSubmit, reset } = useForm<FilteringFields>({});
  if (!filteringParams) {
    return <Loader />;
  }

  const columns = ColumnForUsersTable();

  const goBack = () => {
    setIsFiltering(false);
    const lastVisible = isLastClickBack
      ? usersCollection?.docs.reverse()[1]
      : usersCollection?.docs[0];
    setQ(
      query(
        db.collections.users,
        ...wheres,
        orderBy("firstName", "desc"),
        startAfter(lastVisible),
        limit(6)
      )
    );
    if (disableNext) {
      setDisableNext(false);
    }
    setIsLastClickBack(true);
  };
  const goNext = () => {
    setIsFiltering(false);
    const lastVisible = isLastClickBack
      ? usersCollection?.docs.reverse()[usersCollection?.docs.length - 1]
      : usersCollection?.docs[usersCollection.docs.length - 2];
    setQ(
      query(
        db.collections.users,
        ...wheres,
        orderBy("firstName"),
        startAfter(lastVisible),
        limit(6)
      )
    );
    if (disableBack) {
      setDisableBack(false);
    }
    setIsLastClickBack(false);
  };

  const onSubmit: SubmitHandler<FilteringFields> = async (data) => {
    console.log(data);
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
    } else {
      wheres.push(where("firstName", ">=", "A"));
      wheres.push(where("firstName", "<=", "Z"));
    }
    setIsFiltering(true);
    setWheres(wheres);
    setQ(query(db.collections.users, orderBy("firstName"), ...wheres, limit(6)));
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 0" }}>
      <Stack direction={"row"} sx={{ padding: "2rem 0" }} justifyContent={"space-between"}>
        <Typography variant="h2" component="h2">
          Users
        </Typography>
        <Button variant="contained" onClick={() => navigate("invite")}>
          Create User Request
        </Button>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <AutocompleteName control={control} />
            <ControlledAutocomplete
              control={control}
              name={"job"}
              options={filteringParams.jobs}
              label={"Job"}
            />
            <ControlledAutocomplete
              control={control}
              options={filteringParams.grades}
              name={"grade"}
              label={"Grade"}
            />
            <AutocompleteLocation control={control} fieldName={"location"} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <ControlledAutocomplete
              control={control}
              options={filteringParams.roles}
              name={"role"}
              label={"Role"}
            />

            {/*TODO: department and head*/}

            <ControlledAutocomplete
              control={control}
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
              name={"isActive"}
              label={"Status"}
            />
          </Stack>
          <Stack direction={"row"} spacing={2} paddingBottom={"20px"}>
            <Button variant={"contained"} type={"submit"}>
              Filter
            </Button>
            <Button variant={"outlined"} onClick={() => reset()} type={"submit"}>
              Clear Filter
            </Button>
          </Stack>
        </Stack>
      </form>
      {usersCollection && (
        <Container>
          <MaterialTable
            options={{
              sorting: false,
              paging: false,
              search: false,
              showTitle: false,
              toolbar: false,
            }}
            columns={columns}
            data={
              isLastClickBack
                ? usersCollection.docs
                    .reverse()
                    .slice(0, 5)
                    .map((usersDoc) => usersDoc.data())
                : usersCollection.docs.slice(0, 5).map((usersDoc) => usersDoc.data())
            }
          />
          <Stack>
            <Button onClick={() => goBack()} disabled={disableBack}>
              Back
            </Button>
            <Button onClick={() => goNext()} disabled={disableNext}>
              Next
            </Button>
          </Stack>
        </Container>
      )}
    </Container>
  );
}
