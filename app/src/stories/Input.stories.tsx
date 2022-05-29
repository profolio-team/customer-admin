import { ThemeContextProvider } from "../components/core/theme";
import { Button, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";
import { InputsHelper } from "../components/InputsHelper/InputsHelper";

type Inputs = {
  example: string;
  exampleRequired: string;
  exampleIcon: string;
};

export default {
  title: "Components/Inputs",
};

export function InputTemplate(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const helper = errors.exampleRequired ? "Error message" : "Helper text";

  return (
    <ThemeContextProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={240}>
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
          <InputsHelper />
          <Button variant={"outlined"} type="submit">
            Get Error
          </Button>
        </Stack>
      </form>
    </ThemeContextProvider>
  );
}
InputTemplate.storyName = "Inputs";
