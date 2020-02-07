import React from "react";
import WhatToWatch from "../../components/WhatToWatch/WhatToWatch";
import "./Home.css";

const Home = ({ onFindMovie, loaded }) => (
  <div className="welcome_panel">
    <WhatToWatch onFindMovie={onFindMovie} loaded={loaded} />
  </div>
);

export default Home;
