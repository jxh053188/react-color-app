import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChromePicker } from "react-color";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import DraggableColorList from "./DraggableColorList.js";
import { arrayMove } from "react-sortable-hoc";
import chroma, { hex } from "chroma-js";

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    height: `calc(100vh - 64px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    display: "flex",
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  let history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("#813232");
  const [colors, setColorsArray] = React.useState([
    { color: "blue", name: "blue" },
  ]);
  const [newName, setNewName] = React.useState("");
  const [newPaletteName, setNewPaletteName] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeColor = (color) => {
    setCurrentColor(color.hex);
    console.log(currentColor);
  };

  const addNewColor = () => {
    const newColor = { name: newName, color: currentColor };
    setColorsArray([...colors, newColor]);
    setNewName("");
    console.log(colors);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value);
  };

  const savePalette = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };

    console.log(newPalette);
    props.savePalette(newPalette);
    history.push("/");
  };

  const removeColor = (colorName) => {
    setColorsArray(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColorsArray(arrayMove(colors, oldIndex, newIndex));
  };

  const randomColor = () => {
    let newColor = chroma.random(hex);
    console.log(newColor);
    const newColorName = "Random Color";
    setColorsArray([...colors, { newColor, newColorName }]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
          <ValidatorForm onSubmit={savePalette}>
            <TextValidator
              label="Palette name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handlePaletteNameChange}
              validators={["required"]}
              errorMessages={["Enter a palette name."]}
            />
            <Button variant="contained" color="secondary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <Typography variant="h5">
          Under Construction! Check back for updates and functionality.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setColorsArray([])}
          >
            Clear Palette
          </Button>
          <Button variant="contained" onClick={randomColor}>
            Random color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={handleChangeColor}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newName}
            onChange={handleNameChange}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <Button
            variant="contained"
            type="submit"
            style={{ background: currentColor }}
          >
            Add color
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}
