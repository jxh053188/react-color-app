import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
  },
  content: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    color: "black",
    "&:hover": {
      color: "white",
      transition: "all 0.3s ease-in-out",
      transform: "scale(1.5)",
    },
  },
};

const DraggableColorBox = SortableElement((props) => {
  const { classes, handleDelete } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      <div className={classes.content}>
        <span>{props.name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
