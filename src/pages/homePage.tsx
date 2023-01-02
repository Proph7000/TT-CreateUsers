import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

export const HomePage = () => (
  <ThemeProvider
    theme={theme}
  >
    <Typography
      sx={{
        mt: 28,
        mb: 2,
      }}
      variant="h4"
      textAlign="center"
    >
      Database of Users
    </Typography>

    <Container>
      <Typography
        variant="body2"
      >
        You can use this application to create a list of users.
        When creating a user, there are required (*) and optional
        fields. It is also possible to add an avatar and crop it (optional).
        You can view all created users and delete them.
      </Typography>
    </Container>
  </ThemeProvider>
);
