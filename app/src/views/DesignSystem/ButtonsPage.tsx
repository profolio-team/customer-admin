import Button, { ButtonProps } from "@mui/material/Button";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Stack } from "@mui/material";
import { init, getData } from "../../services/firebase";

const Buttons = (props: ButtonProps) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"}>
        <Button variant={props.variant}>Cancel</Button>
        <Button variant={props.variant} startIcon={<ErrorOutlinedIcon />}>
          Cancel
        </Button>
        <Button variant={props.variant} size={"iconSquareSmall"}>
          <ErrorOutlinedIcon />
        </Button>
      </Stack>
      <Stack spacing={2} direction={"row"}>
        <Button variant={props.variant} size={"large"}>
          Cancel
        </Button>
        <Button variant={props.variant} size={"large"} startIcon={<ErrorOutlinedIcon />}>
          Cancel
        </Button>
        <Button variant={props.variant} size="iconSquareLarge">
          <ErrorOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export function ButtonsPage(): JSX.Element {
  const initHandler = async () => {
    await init();
    const data = await getData();
    console.log(data);
  };

  return (
    <div className="page-content page-content__design-system">
      <h2>Buttons</h2>
      <Stack spacing={3} direction={"row"}>
        <Buttons variant={"contained"} />
        <Buttons variant={"text"} />
        <Buttons variant={"outlined"} />
        <button onClick={initHandler}>DoIt</button>
      </Stack>
    </div>
  );
}
