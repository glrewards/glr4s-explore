import React from "react";

const Landing = () => {
  return (
    <div>
        <li key={"google"}>
            <a href={"/auth/google"}>Login with Google</a>
        </li>,
        <li key={"slack"}>
            <a href={"/auth/slack"}>Login with Slack</a>
        </li>
    </div>
  );
};
export default Landing;
