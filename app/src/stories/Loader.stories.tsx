import { ThemeContextProvider } from "../components/core/theme";
import { Loader } from "../components";

export default {
  title: "Components",
};

export function LoaderTemplate(): JSX.Element {
  return (
    <ThemeContextProvider>
      <Loader />
    </ThemeContextProvider>
  );
}
LoaderTemplate.storyName = "Loader";
