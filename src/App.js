import { useEffect, useState } from "react";
import "./App.css";
import { db, auth } from "./firebase";
import Post from "./Post";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  ////////////
  ////////////
  // useeffect for signup function
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  ///////////
  //////////
  //useEFFECT runs a piece of code based on a specific condition
  //we can use useEffect several times
  useEffect(() => {
    //this is where code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //everytime theres a change in the db, it takes snapshot
        // of the db and fires of this snapshot fn
        setPosts(
          snapshot.docs.map((doc) => ({
            //made the return statement into an object
            //so now it returns an object with values id and post i.e our posts
            id: doc.id,
            post: doc.data(),
          }))
        );
        //updating posts with the snapshot of the db then we
        // are mapping through all docs of the db then returning
        // each doc which then stores all the data in the doc.data
        // which sets the posts with the latest snapshot of the db
      });
  }, []);
  ////////////////////
  // styles for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "4px solid #000000",
    boxShadow: 24,
    p: 4,
  };
  //signup function
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  //sign in function
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };
  ///////////////////
  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form className="app__signup">
            {/* <Typography variant="h5" component="h2"> */}
            <div className="headerLog">
              <center>
                <img
                  className="app__headerLogo"
                  src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                  alt=""
                />
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="instagram"
                />
              </center>
            </div>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={signUp}>SignUp</Button>
            {/* </Typography> */}
          </form>
        </Box>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={style}>
          <form className="app__signup">
            {/* <Typography variant="h5" component="h2"> */}
            <div className="headerLog">
              <center>
                <img
                  className="app__headerLogo"
                  src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                  alt=""
                />
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="instagram"
                />
              </center>
            </div>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={signIn}>Sign In</Button>
            {/* </Typography> */}
          </form>
        </Box>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
        {user ? (
          <div>
            <Button onClick={() => auth.signOut()}>Log Out</Button>
            <div className="userName"> Welcome, {user.displayName} </div>
          </div>
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <h1 className="app__stories">
        Hello and Welcome to my Instagram Clone 🤖 🚀️
      </h1>
      {/* Posts */}
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id} //adding key helps react to render only the new key object
              //instead of re-rendering the whole list. it only renders the new post after comparing the unique keys
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageURL={post.imageURL}
            />
          ))}
        </div>
        {/* Insta embed */}
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            clientAccessToken="123|456"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
        {/* Insta embed */}
      </div>
      {/* Posts */}

      {/* Upload */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <div className="footer">Welcome, please login to upload.</div>
      )}
      {/* Upload */}
    </div>
  );
}

export default App;
