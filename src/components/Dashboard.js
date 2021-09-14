import React from "react";
import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import HomeIcon from "@material-ui/icons/Home";
import useAddLike from "../hooks/useAddLike";
import useFetchLikedImages from "../hooks/useFetchLikedImages";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSnackbar } from "notistack";
import useDislikeImage from "../hooks/useDislikeImage";
import { useHistory } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  CircularProgress,
  Button,
  makeStyles,
  withStyles,
  fade,
} from "@material-ui/core";

const StyledCircularProgress = withStyles((theme) => ({
  root: {
    color: "GREEN",
    display: "block",
    margin: "auto",
    marginTop: "10%",
  },
}))(CircularProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: "20px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  scroll: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "2px",
    },
  },
}));

export default function Dashboard(props) {
  const [addLike] = useAddLike();
  const [imageList, setImageList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { userIdPassed } = props.match.params;

  const [userId, setUserId] = useState(userIdPassed);
  const { data, isSuccess, refetch } = useFetchLikedImages(userIdPassed);
  const [dislikeImage] = useDislikeImage();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-6-3&page=1&api_key=${process.env.REACT_APP_NASA_API_KEY}`
      )
      .then(async (res) => {
        setImageList(res.data.photos);
      })
      .catch((er) => {
        setError(er);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  function handleAddLike(id) {
    addLike(
      {
        userId: userId,
        imageId: id,
      },
      {
        onSuccess: () => {
          refetch();
          enqueueSnackbar("Liked", {
            variant: "success",
          });
        },
      },
      {
        onError: ({ data }) => {
          refetch();
          enqueueSnackbar("Please try again", {
            variant: "error",
          });
        },
      }
    );
  }
  function handleUnLike(id) {
    dislikeImage(
      {
        userId: userId,
        imageId: id,
      },
      {
        onSuccess: ({ data }) => {
          refetch();
          enqueueSnackbar("Unliked", {
            variant: "success",
          });
        },
      },
      {
        onError: ({ data }) => {
          refetch();
          enqueueSnackbar("Please try again", {
            variant: "error",
          });
        },
      }
    );
  }
  const classes = useStyles();

  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Home
            </Typography>
            <Typography variant="h6" style={{ margin: "auto" }}>
              {data ? data.name : null}
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  history.push(`/profile/likedImages/${userId}`);
                  window.location.reload();
                }}
              >
                <FavoriteIcon />
                <Typography variant="h6" className={classes.title}>
                  Liked Images
                </Typography>
              </IconButton>
              <Button
                color="inherit"
                onClick={() => {
                  setUserId(false);
                  history.push("/");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="imageContainer">
            {isLoading ? (
              <StyledCircularProgress size={100} />
            ) : error ? (
              <p className="errorText">{error}</p>
            ) : (
              <div>
                <p className="searchMain">Search Results</p>
                <div className="itemsContainer">
                  {imageList &&
                    imageList.map((image, index) => {
                      return (
                        <Card className={classes.root}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="350"
                              image={image.img_src}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                Taken with {image.camera.full_name} by{" "}
                                {image.rover.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                ID : {image.id}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {image.earth_date}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <IconButton aria-label="add to favorites">
                              {data &&
                              data.imageIds.includes(image.id.toString()) ? (
                                <FavoriteIcon
                                  variant="contained"
                                  style={{ color: "#098060" }}
                                  onClick={() => handleUnLike(image.id)}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  variant="contained"
                                  style={{ color: "#098060" }}
                                  onClick={() => handleAddLike(image.id)}
                                />
                              )}
                            </IconButton>
                          </CardActions>
                        </Card>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
