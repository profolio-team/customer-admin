import { Button, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function InputsPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example"));
  const helper = errors.exampleRequired ? "Error message" : "Helper text";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width={240} padding={10}>
        <TextField
          label={"Label"}
          helperText={"Helper text"}
          defaultValue="Test"
          {...register("example")}
        />
        <TextField
          label={"Error field"}
          {...register("exampleRequired", { required: true })}
          error={!!errors.exampleRequired}
          helperText={helper}
        />
        <TextField
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
          label={"Label"}
          helperText={"Helper text"}
          defaultValue="test"
          {...register("example")}
        />
        <TextField
          InputProps={{
            endAdornment: <AccountCircle />,
          }}
          label={"Label"}
          helperText={"Helper text"}
          defaultValue="test"
          {...register("example")}
        />
        <Button variant={"outlined"} type="submit">
          Get Error
        </Button>
      </Stack>
    </form>
  );
}
