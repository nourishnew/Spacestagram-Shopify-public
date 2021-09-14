import React from "react";
import GridLoader from "react-spinners/GridLoader";
import Center from "./Center";
import { Colors } from "./constants";

export default function FullPageLoader() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Center>
        <div style={{ width: "min-content", margin: "auto" }}>
          <GridLoader color={Colors.PRIMARY} />
        </div>
      </Center>
    </div>
  );
}
