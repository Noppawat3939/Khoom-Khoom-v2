"use client";

import React from "react";
import { MainContainer } from "@/container";
import { LazyLoad } from "@/components";

const Main = () => {
  return (
    <LazyLoad>
      <MainContainer />
    </LazyLoad>
  );
};

export default Main;
