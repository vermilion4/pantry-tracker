import { Inter } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker",
  description: "Pantry Tracker Management System",
};

export default function RootLayout ({ children })
{
  return (
    <html lang="en">
      <Box component={ 'body' } mb={ 7 } className={ inter.className }>
        { children }
        <Box position={ 'fixed' } width={ 1 } py={ 3 } sx={ {
          backgroundColor: '#1f1f1f',
          color: 'white',
        } } textAlign={ 'center' } bottom={ 0 } >
          <footer>&copy;2024 Developed by Ndupu Adaeze💖</footer>
        </Box>
      </Box>
    </html>
  );
}
