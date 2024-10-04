import React from 'react';
import { registerRootComponent } from 'expo';
import { Routes } from "./src/routes"

registerRootComponent(Routes);

export default function App() {
  return(
    <Routes/>
  )
}
