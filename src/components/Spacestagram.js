import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import useFormInput from "../hooks/useFormInput";
import shopifyLogo from "../images/shopifylogo.jpg";
import useCreateUser from "../hooks/useCreateUser";
import useLoginUser from "../hooks/useLoginUser";
import { CircularProgress, withStyles } from "@material-ui/core";

const StyledCircularProgress = withStyles((theme) => ({
  root: {
    color: "GREEN",
    display: "block",
    margin: "auto",
    marginTop: "10%",
  },
}))(CircularProgress);
export default function Spacestagram() {
  const user = useFormInput();
  const [signupMode, setSignUpMode] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [createUser] = useCreateUser();
  const [logInUser] = useLoginUser();

  function handleSignIn() {
    setLoading(true);
    setError(false);
    logInUser(
      {
        name: user.value,
      },
      {
        onSuccess: ({ data }) => {
          setLoading(false);
          if (data === "") {
            setError(
              "Account not found. Please create an account using your name"
            );
          } else {
            history.push(`/profile/${data.id}`);
            window.location.reload();
          }
        },
      }
    );
    setLoading(false);
  }

  function handleCreateUser() {
    setLoading(true);
    setError(false);

    createUser(
      {
        name: user.value,
      },
      {
        onSuccess: ({ data }) => {
          setLoading(false);
          history.push(`/profile/${data}`);
          window.location.reload();
        },
      }
    );
  }

  return (
    <div>
      <div className="loginBox">
        <div className="loginArt">
          <p
            style={{
              fontFamily: "Akaya Kanadaka, cursive",
              fontSize: "50px",
              fontWeight: "500",
              marginBottom: "1em",
              margin: "1em",
            }}
          >
            Spacestagram
          </p>
          <p
            style={{
              fontSize: "40px",
              textAlign: "center",
              overflowWrap: "break-word",
              fontFamily: "Fredoka One, cursive",
              color: "#098060",
              margin: "1%",
            }}
          >
            Discover amazing pictures taken by Mars Rover
          </p>
          <p
            style={{
              fontSize: "25px",
              fontFamily: "Nunito, sans-serif",
              fontWeight: "600",
              textAlign: "center",
              overflowWrap: "break-word",
              margin: "1%",
            }}
          >
            Like the image to save it
          </p>

          <p
            style={{
              fontSize: "25px",
              fontFamily: "Fredoka One, cursive",
              textAlign: "center",
              overflowWrap: "break-word",
              margin: "1%",
            }}
          >
            Create an account using your name{" "}
          </p>
          <img
            src={shopifyLogo}
            alt="shopify icon"
            style={{
              width: "30%",
              height: "20%",
              position: "relative",
              margin: "auto",
              display: "block",
            }}
          />
          <p
            style={{
              fontSize: "25px",
              fontFamily: "Fredoka One, cursive",
              textAlign: "center",
              overflowWrap: "break-word",
              margin: "3%",
            }}
          >
            Sign in using the same name to see all the saved images.
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{ position: "relative", bottom: "5%" }}
          >
            <path
              fill="#098060"
              fill-opacity="1"
              d="M0,32L20,64C40,96,80,160,120,165.3C160,171,200,117,240,128C280,139,320,213,360,245.3C400,277,440,267,480,240C520,213,560,171,600,149.3C640,128,680,128,720,117.3C760,107,800,85,840,101.3C880,117,920,171,960,181.3C1000,192,1040,160,1080,128C1120,96,1160,64,1200,85.3C1240,107,1280,181,1320,213.3C1360,245,1400,235,1420,229.3L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="loginContainer">
          <div className="inputContainer">
            <h2
              style={{
                textAlign: "center",
                fontFamily: "Nunito, sans-serif",
                marginTop: "2em",
                color: "#008060",
              }}
            >
              {signupMode ? "Signup" : "Login"}
            </h2>
            <div className="verticalFlex">
              <input
                type="text"
                placeholder="Name"
                value={user.value}
                onChange={user.onChange}
                maxLength="30"
                className="loginInput"
              />
              {signupMode ? (
                <Button
                  disabled={loading}
                  type="submit"
                  style={{
                    width: "75%",
                    margin: "auto",
                    marginTop: "1em",
                    marginBottom: "1em",
                    backgroundColor: "#008060",
                    color: "#fbf7ed",
                  }}
                  onClick={() => handleCreateUser()}
                >
                  Signup
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  type="submit"
                  style={{
                    width: "75%",
                    margin: "auto",
                    marginTop: "1em",
                    marginBottom: "1em",
                    backgroundColor: "#008060",
                    color: "#fbf7ed",
                  }}
                  onClick={() => handleSignIn()}
                >
                  Login
                </Button>
              )}
            </div>
            {error && (
              <p
                style={{
                  color: "RED",
                  textAlign: "center",
                  marginRight: "15px",
                  fontFamily: "Nunito, sans-serif",
                }}
              >
                {error}
              </p>
            )}

            <div
              className="horizontal_flex"
              style={{ margin: "auto", marginTop: "1em", width: "fit-content" }}
            >
              {signupMode ? (
                <div>
                  <p
                    style={{
                      color: "black",
                      marginRight: "15px",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    Already have an account ?
                  </p>
                  <p
                    style={{
                      color: "#008060",
                      fontFamily: "Nunito, sans-serif",
                    }}
                    onClick={() => {
                      setSignUpMode(false);
                    }}
                  >
                    Log in
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      color: "black",
                      marginRight: "15px",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    Create an account ?
                  </p>
                  <p
                    style={{
                      color: "#efac35",
                      fontFamily: "Nunito, sans-serif",
                    }}
                    onClick={() => {
                      setSignUpMode(true);
                    }}
                  >
                    SignUp
                  </p>
                </div>
              )}
              {loading ? <StyledCircularProgress size={50} /> : null}
            </div>
          </div>
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Nunito, sans-serif",
          margin: "auto",
          marginTop: "1em",
          color: "#716047",
        }}
      >
        Built for Winter 2022
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Nunito, sans-serif",
          margin: "auto",
          marginTop: "1em",
          color: "#716047",
        }}
      >
        Shopify front-end internship technical challenge (3rd attempt)
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Nunito, sans-serif",
          margin: "auto",
          marginTop: "1em",
          color: "#716047",
        }}
      >
        :(
      </p>
    </div>
  );
}
