'use client';
import { firestore } from "@/firebase";
import { Box, Button, createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import PantryTable from "./components/pantryTable";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f1f1f',
    }
  },
});

export default function Home ()
{

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const pantryTableRef = useRef(null);

  const updateInventory = async () =>
  {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach(doc =>
    {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });

    setInventory(inventoryList);
    setLoading(false);
  };

  const removeItem = async (item) =>
  {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists())
    {
      const { quantity } = docSnap.data();
      if (quantity > 1)
      {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true });
      } else
      {
        await deleteDoc(docRef);
      }
      await updateInventory();
    }
  };

  const addItem = async (item) =>
  {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists())
    {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true });
    }
    else
    {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const addNewItem = async (itemName, itemData) =>
  {
    const docRef = doc(collection(firestore, 'pantry'), itemName);
    await setDoc(docRef, itemData);
    updateInventory();
  };

  useEffect(() =>
  {
    updateInventory();
  }, []);

  const handleSearch = (query) =>
  {
    setSearchQuery(query);
  };

  const scrollToPantryTable = () =>
  {
    pantryTableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={ theme }>
      <Navbar addItem={ addNewItem } />
      <Box px={ { xs: 2, sm: 5 } } py={ 9 }>
        <Grid
          container
          minHeight="80vh"
          alignItems="center"
          justifyContent="space-between"
          sx={ {
            placeContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
          } }
        >
          <Grid item xs={ 12 } md={ 6 }>
            <Typography variant="h3" mb={ 3 }>Organize Your Pantry with Ease</Typography>
            <Typography variant="body1">
              Keep track of your pantry items, avoid waste,
              and make grocery shopping a breeze with
              our Pantry Tracker.
            </Typography>
            {/* Get started (scroll to table) */ }
            <Box mt={ 3 }>
              <Button onClick={ scrollToPantryTable } variant="contained" color="secondary" size="large">Get started</Button>
            </Box>
          </Grid>
          <Grid item xs={ 12 } md={ 6 }>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              overflow="hidden"
            >
              <Box
                component="img"
                src="/hero-bg.jpg"
                alt="decorative hero image"
                sx={ {
                  width: '100%',
                  height: 'auto',
                  maxWidth: { xs: '300px', sm: '400px' },
                  maxHeight: { xs: '300px', sm: '400px' },
                  objectFit: 'cover',
                  borderRadius: '10px',
                } }
              />
            </Box>
          </Grid>
        </Grid>
        <Box mt={ 5 } mb={ 3 }>
          <SearchBar onSearch={ handleSearch } />
        </Box>
        {/* pantry table */ }
        <Box ref={ pantryTableRef } mt={ 5 }>
          { loading ? <Box textAlign={ 'center' }><Typography>Loading inventory...</Typography></Box> : inventory.length > 0 ? (
            <PantryTable
              removeItem={ removeItem }
              addItem={ addItem }
              rows={ inventory.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
              ) }
            />
          ) : (
            <Box textAlign={ 'center' }><Typography>No Items added yet</Typography></Box>
          ) }
        </Box>
      </Box >
    </ThemeProvider>
  );
}
