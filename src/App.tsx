import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <h1 className="heading">Cards</h1>
      <div className="container">
        <Card />
      </div>
    </>
  );
}

export default App;
