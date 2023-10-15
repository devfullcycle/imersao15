
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Navbar } from '../components/Navbar/Navbar';

export const metadata = {
  title: 'Codepix title',
  description: 'Codepix description',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  //console.dir(props, {depth: 10});
  
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar/>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mx: ['16px', '120px'],
              my: ['80px', '120px'],
            }}
          >
            {props.children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
