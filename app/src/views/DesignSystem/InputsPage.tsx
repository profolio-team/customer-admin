import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { InputsHelper } from "../../components/InputsHelper/InputsHelper";

type Inputs = {
  example: string;
  exampleRequired: string;
  exampleIcon: string;
};

export function InputsPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const helper = errors.exampleRequired ? "Error message" : "Helper text";

  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Inputs
        </Typography>
      </Box>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={240} padding={10}>
          <TextField
            label={"Label"}
            helperText={"Helper text"}
            placeholder={"Placeholder"}
            {...register("example")}
          />
          <TextField
            label={"Error field"}
            {...register("exampleRequired", { required: true })}
            placeholder={"Placeholder"}
            error={!!errors.exampleRequired}
            helperText={helper}
          />
          <TextField
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
            label={"Label"}
            helperText={"Helper text"}
            placeholder={"Placeholder"}
            {...register("exampleIcon")}
          />
          <InputsHelper options={[{ title: "none" }]} />
          <Button variant={"outlined"} type="submit">
            Get Error
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
