import React from "react";
import { Button, TextInput, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import LoginFormContainer from "./login/LoginFormContainer";

const Landing = () => {
  return (
    <div>
      <div className="container">
          <div className="row">
          <a href={"/auth/google"}>
              <img
                  alt="Login with Google"
                  height="40"
                  width="150"
                  src={require("../images/btn_google_signin_dark_normal_web.png")}
              />
          </a>{" "}
          <a href={"/auth/slack"}>
              <img
                  alt="Add to Slack"
                  height="40"
                  width="150"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
              />
          </a>
          </div>
        <LoginFormContainer />
      </div>
      <Link to={"/signup"}>Create an account</Link>
    </div>
  );
};
export default Landing;
