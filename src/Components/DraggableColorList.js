import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorlist = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.color}
          color={color.color}
          name={color.name}
          handleDelete={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorlist;
