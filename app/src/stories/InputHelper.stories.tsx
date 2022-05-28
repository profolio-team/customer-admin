import { ThemeContextProvider } from "../components/core/theme";
import { InputsHelper } from "../components/InputsHelper/InputsHelper";

export default {
  title: "Components/Inputs",
};

export const InputTemplate = () => {
  return (
    <ThemeContextProvider>
      <InputsHelper />
    </ThemeContextProvider>
  );
};

InputTemplate.storyName = "Inputs";
