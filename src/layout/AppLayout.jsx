import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";

const AppLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#010101",
          py: 2,
          px: 3,
          position: "relative",
          zIndex: 1000,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Aggravo",
            fontSize: "2rem",
            fontWeight: "900",
            color: "#f1f1f1ff",
            cursor: "pointer",
          }}
          onClick={() => {
            console.log("Logo clicked");
            navigate("/");
          }}
        >
          RE:EL
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            disableRipple
            sx={{
              fontWeight: "600",
              color: "#f1f1f1ff",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#9452ffff",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => {
              console.log("Home clicked");
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            disableRipple
            sx={{
              fontWeight: "600",
              color: "#f1f1f1ff",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#9452ffff",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => {
              console.log("Movies clicked");
              navigate("/movies");
            }}
          >
            Movies
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              ml: 2,
            }}
          >
            <Search color="#f1f1f1" size={"1.5rem"} />
            <TextField
              onClick={() => console.log("Search clicked")}
              sx={{
                "& .MuiInputBase-root": {
                  height: "2rem",
                  width: "8rem",
                  borderRadius: "3rem",
                  backgroundColor: "#2a2a2a",
                  color: "#f1f1f1",
                },
                "& .MuiInputBase-input": {
                  padding: "0 1rem",
                  color: "#f1f1f1",
                  "&::placeholder": {
                    color: "#9a9a9a",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #4a4a4a",
                },
                "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #9452ffff",
                },
                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "2px solid #9452ffff",
                  },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            color: "white",
            cursor: "pointer",
          }}
          onClick={toggleDrawer(true)}
        >
          <Menu />
        </Box>

        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#010101",
              width: "250px",
              p: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Aggravo",
                fontSize: "1.5rem",
                fontWeight: "900",
                color: "#f1f1f1ff",
              }}
            >
              RE:EL
            </Typography>
            <X
              color="#f1f1f1"
              size={"1.5rem"}
              onClick={toggleDrawer(false)}
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Search color="#f1f1f1" size={"1.5rem"} />
            <TextField
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  height: "2rem",
                  borderRadius: "3rem",
                  backgroundColor: "#2a2a2a",
                  color: "#f1f1f1",
                },
                "& .MuiInputBase-input": {
                  padding: "0 1rem",
                  color: "#f1f1f1",
                  "&::placeholder": {
                    color: "#9a9a9a",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #4a4a4a",
                },
                "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #9452ffff",
                },
                "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "2px solid #9452ffff",
                  },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              disableRipple
              fullWidth
              sx={{
                justifyContent: "flex-start",
                fontWeight: "600",
                color: "#f1f1f1ff",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#9452ffff",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => handleNavigation("/")}
            >
              Home
            </Button>
            <Button
              disableRipple
              fullWidth
              sx={{
                justifyContent: "flex-start",
                fontWeight: "600",
                color: "#f1f1f1ff",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#9452ffff",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => handleNavigation("/movies")}
            >
              Movies
            </Button>
          </Box>
        </Drawer>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
