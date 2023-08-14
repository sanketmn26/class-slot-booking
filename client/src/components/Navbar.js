import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../App.js";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  // logout function
  const logout = () => {
    setUser(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "0px 1px 7px #858585",
        }}
      >
        <Toolbar>
          <Typography
            id="logo"
            sx={{
              width: "90%",
              m: "auto",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            BookMyClass
          </Typography>

          {user && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={logout}
                sx={{
                  color: "blue",
                  backgroundColor: "white",
                  right: "2%",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
