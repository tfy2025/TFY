import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [api, setApi] = useState(null);

  return (
    <>
      <Header fullpageApi={api} />

      <ReactFullpage
        scrollingSpeed={1000}
        navigation={false}
        render={({ fullpageApi }) => {
          if (!api) setApi(fullpageApi);
          return (
            <ReactFullpage.Wrapper>
              <div className="section"><Hero /></div>
              <div className="section"><About /></div>
              <div className="section"><Services /></div>
              <div className="section"><Contact /></div>
              {/* <div className="section"><Footer /></div> */}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default App;
