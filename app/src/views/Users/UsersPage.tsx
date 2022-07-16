import MaterialTable from "material-table";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Loader } from "../../components";
import db from "../../services/firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutocompleteDataInDB } from "../../components/Autocompletes/AutocompleteDataInDB";
import { ColumnForUsersTable } from "./ColumnForUsersTable";
import useUsers from "../../hooks/useUsers";
import { ControlledAutocomplete } from "../../components/Autocompletes/ControlledAutocomplete";
import { AutocompleteDepartments } from "../../components/Autocompletes/AutocompleteDepartments";
import { constructQueryConstraint } from "../../utils/constructQueryConstraintForUserTable";
import { UserInfo } from "../../../../typescript-types/db.types";

export function UsersPage() {
  const navigate = useNavigate();
  const [filteringParams] = useDocumentData(db.documents.config.userParams);
  const navigation = useNavigate();
  const { usersForTable, filter, next, back, load, clearFilter, disableNext, disableBack, update } =
    useUsers(6);
  const { control, handleSubmit, reset } = useForm<UserInfo>({});
  if (!filteringParams) {
    return <Loader />;
  }

  const columns = ColumnForUsersTable(navigation, update);

  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    filter(constructQueryConstraint(data));
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
            <AutocompleteDataInDB control={control} fieldName={"fullName"} label={"Full Name"} />
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
            <AutocompleteDataInDB control={control} fieldName={"location"} label={"Location"} />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <ControlledAutocomplete
              control={control}
              options={filteringParams.roles}
              name={"role"}
              label={"Role"}
            />
            <AutocompleteDepartments control={control} />

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
            <Button
              variant={"outlined"}
              onClick={() => {
                reset();
                clearFilter();
              }}
            >
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
              data={usersForTable}
            />
            <Stack>
              <Button onClick={() => back()} disabled={disableBack}>
                Back
              </Button>
              <Button onClick={() => next()} disabled={disableNext}>
                Next
              </Button>
            </Stack>
          </Container>
        )
      )}
    </Container>
  );
}
