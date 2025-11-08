import { Box, Button, TextField, Typography } from "@mui/material";
import { Search } from "lucide-react";
import React from "react";
import { Outlet, useNavigate } from "react-router";

const AppLayout = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/")}
        >
          RE:EL
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
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
              },
            }}
            onClick={() => navigate("/")}
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
              },
            }}
            onClick={() => navigate("/movies")}
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
              sx={{
                "& .MuiInputBase-root": {
                  height: "2rem",
                  width: "8rem",
                  borderRadius: "3rem",
                  backgroundColor: "#7c7c7cff",
                  "&:hover fieldset": {
                    backgroundColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    backgroundColor: "white",
                    border: "none",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
