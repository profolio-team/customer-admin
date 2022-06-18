import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, Container, Stack } from "@mui/material";

export default {
  title: "Components",
};

export function TypographyTemplate(): JSX.Element {
  return (
    <Stack gap="20px">
      <Typography variant="h1" component="h1">
        Typography variant="h1" component="h1" | H1/48px
      </Typography>

      <Typography variant="h2" component="h2">
        Typography variant="h2" component="h2" | H2/32px
      </Typography>

      <Typography variant="h3" component="h3">
        Typography variant="h3" component="h3" | H3/24px
      </Typography>

      <Typography variant="h4" component="h4">
        Typography variant="h4" component="h4" | H4/20px
      </Typography>

      <Typography variant="body1" component="p">
        Typography variant="body1" component="p" | Body/18px
      </Typography>

      <Typography variant="body2" component="p">
        Typography variant="body2" component="p" | Body Small/16px
      </Typography>

      <Typography variant="caption" component="p">
        Typography variant="caption" component="p" | Body Extra Small/14px
      </Typography>

      <Link href="#" variant="body2">
        Link href="#" variant="body2" | Base/16px
      </Link>

      <Link href="#" variant="caption">
        Link href="#" variant="caption" | Small/14px
      </Link>

      <Typography variant="body2" component="p">
        Сделайте свой интерфейс более эффективным и легким для чтения с помощью правильного
        выравнивания текста. Выравнивание текста - небольшая, но важная часть интерфейса. Оно влияет
        на то, как мы сканируем контент на экране. Правильное выравнивание - один из главных
        показателей профессионально созданного цифрового продукта. | Typography variant="body2"
        component="p"
      </Typography>

      <Typography variant="caption" component="p">
        Typography variant="caption" component="p"
      </Typography>
    </Stack>
  );
}

TypographyTemplate.storyName = "Typography";
