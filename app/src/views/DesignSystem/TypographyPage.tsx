import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, Container } from "@mui/material";

export function TypographyPage(): JSX.Element {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h1" component="h1">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          H1/48px
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          H2/32px
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" component="h3">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          H2/24px
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" component="p">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          Body/18px
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" component="p">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          Body Small/16px
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" component="p">
          Make your portfolio like a piece of cake
        </Typography>
        <Typography variant="caption" component="p">
          Body Extra Small/14px
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">
          Actions
        </Typography>

        <Link href="#" variant="body2">
          Make your portfolio like a piece of cake
        </Link>
        <Typography variant="caption" component="p">
          Base/16px
        </Typography>

        <Link href="#" variant="caption">
          Make your portfolio like a piece of cake
        </Link>

        <Typography variant="caption" component="p">
          Small/14px
        </Typography>
      </Box>
      <Box>
        <Typography variant="h2" component="h2">
          Multiline example
        </Typography>

        <Typography variant="body2" component="p">
          Сделайте свой интерфейс более эффективным и легким для чтения с помощью правильного
          выравнивания текста. Выравнивание текста - небольшая, но важная часть интерфейса. Оно
          влияет на то, как мы сканируем контент на экране. Правильное выравнивание - один из
          главных показателей профессионально созданного цифрового продукта.
        </Typography>
      </Box>
    </Container>
  );
}
