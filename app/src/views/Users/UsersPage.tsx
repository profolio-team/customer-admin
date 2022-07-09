import MaterialTable from "material-table";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutocompleteName } from "../../components/Autocompletes/AutocompleteName";
import { AutocompleteLocation } from "../../components/Autocompletes/AutocompleteLocation";
import { useEffect, useState } from "react";
import { ColumnForUsersTable } from "./ColumnForUsersTable";
import useUsers from "../../hooks/useUsers";
import { ControlledAutocomplete } from "../../components/Autocompletes/ControlledAutocomplete";
import { AutocompleteDepartments } from "../../components/Autocompletes/AutocompleteDepartments";
import { QueryConstraint } from "@firebase/firestore";
import { constructQueryConstraint } from "../../utils/constructQueryConstraintForUserTable";

export interface FilteringFields {
  name?: string;
  job?: string;
  grade?: string;
  location?: string;
  role?: string;
  departmentId?: string;
  isActive?: boolean;
}

export function UsersPage() {
  const navigate = useNavigate();
  const [filteringParams] = useDocumentData(db.documents.config.userParams);

  const [wheres, setWheres] = useState<QueryConstraint[]>([]);

  const { usersForTable, filter, next, back, load } = useUsers(6);

  const [isLastClickBack, setIsLastClickBack] = useState(false);

  const [isFiltering, setIsFiltering] = useState(true);

  const [disableNext, setDisableNext] = useState(false);

  const [disableBack, setDisableBack] = useState(true);

  useEffect(() => {
    if (usersForTable && usersForTable.length < 6) {
      isLastClickBack ? setDisableBack(true) : setDisableNext(true);
    }
    if (isFiltering) {
      setDisableBack(true);
      setDisableNext(false);
      if (usersForTable && usersForTable.length < 6) {
        setDisableNext(true);
      }
    }
  }, [usersForTable]);

  useEffect(() => {
    if (usersForTable && usersForTable.length < 6) {
      setDisableBack(true);
      setDisableNext(true);
    }
    if (usersForTable && usersForTable.length === 6) {
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
    back();
    if (disableNext) {
      setDisableNext(false);
    }
    setIsLastClickBack(true);
  };
  const goNext = () => {
    setIsFiltering(false);
    next();
    if (disableBack) {
      setDisableBack(false);
    }
    setIsLastClickBack(false);
  };

  const onSubmit: SubmitHandler<FilteringFields> = async (data) => {
    setIsFiltering(true);
    filter(constructQueryConstraint(data));
    setWheres(wheres);
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
            <AutocompleteDepartments control={control} fieldName={"departmentId"} />

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
      {load ? (
        <Loader />
      ) : (
        usersForTable && (
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
              data={usersForTable.slice(0, 5).map((usersDoc) => {
                return {
                  ...usersDoc,
                };
              })}
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
        )
      )}
    </Container>
  );
}
