import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div>
      <Layout>
      {/* <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
    <div className="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="dark" data-vanity="jadon-wolffs"><a className="LI-simple-link" href='https://za.linkedin.com/in/jadon-wolffs?trk=profile-badge'>Jadon Wolffs</a></div> */}
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
