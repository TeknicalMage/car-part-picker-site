import React, {useState, useEffect} from "react"
import {Card, Button, Alert} from "react-bootstrap"
import {useAuth} from "./contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import './Dashboard.scss';
import $ from "jquery"
import {FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";
import {BiMailSend} from "react-icons/all";
import {GrLocationPin} from "react-icons/all";
import {BsFillArrowDownCircleFill} from "react-icons/all";
import {BsFillArrowLeftCircleFill} from "react-icons/all";
import {BsFillChatDotsFill} from "react-icons/all";
import {ImProfile} from "react-icons/all";
import {ImMenu} from "react-icons/all";
import Camera from "./Camera";
import storage from "./firebase";

import { ref, uploadBytes } from "firebase/storage"
import firebase from "firebase/app";
import "firebase/auth"
import {getDoc, updateDoc} from "firebase/firestore"


// Get the default bucket from a custom firebase.app.App
export default function Dashboard() {
    const [error, setError] = useState("")
    const [img, setImg] = useState("")
    const [url, setUrl] = useState("");
    const [user, setUser] = useState("");
    const db = firebase.firestore();
    var urlBased = null;
    useEffect(() => {
        db.collection("users").doc(currentUser.uid).get().then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });
        // firestore.getDoc(firestore.doc(firebase.db(), "users", auth.currentUser.uid)).then((docSnap) => {
        //     if(docSnap.exists) {
        //         setUser(docSnap.data());
        //     }
        // });

        if(img) {
            const handleUpload = async () => {
                const uploadTask = firebase.storage().ref(`images/${img.name}`).put(img);
                var getLinkTask = firebase.storage().ref(`images/${img.name}`).getDownloadURL().then((url) => {

                    // const xhr = new XMLHttpRequest();
                    // xhr.responseType = 'blob';
                    // xhr.onload = (event) => {
                    //     const blob = xhr.response;
                    // };
                    // xhr.open('GET', url);
                    // xhr.send();
                    //
                    // const img = document.getElementById('myimg');
                    // img.setAttribute('src', url);
                    urlBased = url;
                    console.log(urlBased)
                    document.getElementById("avatarImg").src="https://user-images.githubusercontent.com/52536103/78306268-40e17f00-7543-11ea-8e9f-fa588e399a4d.gif";

                })
                    .catch((error) => {
                        console.log(error)
                        console.log(urlBased)
                    });
                uploadTask.on(
                    "state_changed",
                    async snapshot => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        // setProgress(progress);

                    },
                    error => {
                        console.log(error);
                        getLinkTask = firebase.storage().ref(`images/${img.name}`).getDownloadURL().then((url) => {

                            // const xhr = new XMLHttpRequest();
                            // xhr.responseType = 'blob';
                            // xhr.onload = (event) => {
                            //     const blob = xhr.response;
                            // };
                            // xhr.open('GET', url);
                            // xhr.send();
                            //
                            // const img = document.getElementById('myimg');
                            // img.setAttribute('src', url);
                            console.log(urlBased)
                            urlBased = url;
                        })
                            .catch((error) => {
                                console.log(error)
                                console.log(urlBased)
                            });
                    },
                    async () => {
                        firebase.storage()
                            .ref("images")
                            .child(img.name)
                            .getDownloadURL()
                            .then(async url => {
                                await db.collection("users").doc(currentUser.uid).set({
                                    avatar: url,
                                    avatarPath: `images/${img.name}`
                                })
                                document.getElementById("avatarImg").src=url;
                                console.log(url);
                            });

                    }
                );

                console.log(urlBased)
                setImg("");


            };
           handleUpload()
        }
    }, [img]);
    console.log(img);

    const {currentUser, logout} = useAuth()
    const history = useHistory()

    const style = {color: "white", fontSize: "1.4em"}

    function toggleButton() {
        $('.left-sidebar').toggleClass('minimize')
        if( document.getElementById("cameraID").style.display == 'none') {
            document.getElementById("cameraID").style.display = 'flex'
        } else {
            document.getElementById("cameraID").style.display = 'none'
        }

    }

    function userProfile() {
        $('.left-sidebar').toggleClass('minimize')
        $('#cameraID').toggleClass('show')
        if( document.getElementById("cameraID").style.display == 'none') {
            document.getElementById("cameraID").style.display = 'flex'
        } else {
            document.getElementById("cameraID").style.display = 'none'
        }
    }

    function closeChatButton() {
        $('.direct-messaging ').addClass('minimize')
    }

    function openChatButton() {
        $('.direct-messaging ').toggleClass('minimize')
    }

    function openMusicButton() {
        $('.music-player').toggleClass('show')
    }

    function openTimerButton() {
        history.push("./update-profile")
    }

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }

    if (currentUser == null) {
        return (
            <>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Successfully Logged Out</h2>
                    </Card.Body>
                </Card>
            </>
        )
    } else if (currentUser.emailVerified) {
        console.log(user.avatar);
        return user ? (
            <>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
                <div className="main-container">
                    <div className="left-sidebar">
                        <div className="inner">
                            <div className="user-profile" onClick={userProfile}>
                                <div className="user-background"></div>
                                <div className="img_container user-image">
                                        <img src= {user.avatar || "https://avatarfiles.alphacoders.com/262/thumb-1920-262989.png" }
                                             alt="avatar" id = "avatarImg"/>
                                        <div className="overlay">
                                            <div id="cameraID">
                                                <label htmlFor="photo" display="block" margin="auto" text-align="center"
                                                       vertical-align="middle" text-align="center">
                                                    <Camera/>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept='image/*'
                                                    style={{display: "none"}}
                                                    id="photo"
                                                    onChange ={(e) => setImg(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                </div>
                                <div className="user-info">
                                    <p className="user-name">{currentUser.displayName}</p>
                                    <p className="user-title">Insert Bio Here</p>
                                    <p className="user-location">
                                        <GrLocationPin/> Malta
                                    </p>
                                </div>
                            </div>
                            <div className="main-menu"></div>
                            <div className="social-links">
                                <a href="#"><FaFacebook/> </a>
                                <a href="#"><FaTwitter/></a>
                                <a href="#"><FaInstagram/></a>
                            </div>
                        </div>
                        <div className="toggle-button" onClick={toggleButton}><ImMenu style={style}/></div>
                    </div>
                    <div className="main-content">

                        <div className="modal music-player">
                            <div className="heading">
                                <h3>Daily UI #009</h3>
                                <h2>Music Player</h2>
                            </div>
                            <div className="audio-player-large">
                                <div className="audio-image">
                                    <div className="artist-name">Imagine Dragons</div>
                                    <div className="song-title">Thunder</div>
                                </div>
                                <div className="audio-slider">
                                    <div className="slider"></div>
                                </div>
                                <div className="audio-buttons">
                                    <div className="previous-btn"><i className="icon ion-md-skip-backward"></i></div>
                                    <div className="pause-btn"><i className="icon ion-md-pause"></i></div>
                                    <div className="next-btn"><i className="icon ion-md-skip-forward"></i></div>
                                </div>
                            </div>
                            <div className="audio-player-small">
                                <div className="audio-background"></div>
                                <div className="audio-image"></div>
                                <div className="audio-info">
                                    <div className="audio-text">Now Playing</div>
                                    <div className="song-title">Thunder - Imagine Dragons</div>
                                </div>
                                <div className="audio-buttons">
                                    <div className="pause-btn"><i className="icon ion-md-pause"></i></div>
                                    <div className="next-btn"><i className="icon ion-md-skip-forward"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal timer-display">
                            <div className="heading">
                                <h3>Daily UI #014</h3>
                                <h2>Countdown Timer</h2>
                            </div>
                            <div className="countdown-timer-large">
                                <div className="animatedBackground"></div>
                                <div className="info">
                                    <div className="header">
                                        <h2>Stay Tuned</h2>
                                    </div>
                                    <div className="countdown">
                                        <div>
                                            <p>169</p>
                                            <p>days</p>
                                        </div>
                                        <div>
                                            <p>10</p>
                                            <p>hours</p>
                                        </div>
                                        <div>
                                            <p>31</p>
                                            <p>minutes</p>
                                        </div>
                                        <div>
                                            <p>01</p>
                                            <p>seconds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="countdown-timer-small">
                                <div className="backgroundImage"></div>
                                <div className="countdown">
                                    <div>
                                        <p>169</p>
                                        <p>days</p>
                                    </div>
                                    <div>
                                        <p>10</p>
                                        <p>hours</p>
                                    </div>
                                    <div>
                                        <p>31</p>
                                        <p>minutes</p>
                                    </div>
                                    <div>
                                        <p>01</p>
                                        <p>seconds</p>
                                    </div>
                                </div>
                                <div className="animated-clock-face"></div>
                            </div>
                        </div>

                        <div className="direct-messaging minimize">
                            <div className="header-container">
                                <div>
                                    <img src="https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff"/>
                                </div>
                                <div className="header-user">
                                    <span>Dani</span>
                                    <span className="online"></span>
                                </div>
                                <div className="close-chat-btn" onClick={closeChatButton}><BsFillArrowDownCircleFill/>
                                </div>

                            </div>
                            <div className="message-container">
                                <div className="msg received">
                                    <p><span className="time">10:50pm</span></p>
                                    <p className="text">Hi!</p>
                                </div>
                                <div className="msg received">
                                    <p className="text">How are you today?</p>
                                </div>
                                <div className="msg sent">
                                    <p className="time">10:51pm</p>
                                    <p className="text">Hi Daniela, doing good thanks, yourself?</p>
                                </div>
                            </div>
                            <div className="send-container">
                                <input className="type-message" placeholder="Your message ..."></input>
                                <div className="send-btn"><BiMailSend/></div>
                            </div>
                        </div>

                    </div>
                    <div className="right-sidebar">
                        <div className="btn open-music-btn" onClick={openMusicButton}><BsFillChatDotsFill
                            style={style}/></div>
                        <div className="btn open-timer-btn" onClick={openTimerButton}><ImProfile style={style}/></div>
                        <div className="btn open-chat-btn" onClick={openChatButton}><i
                            className="icon ion-md-chatbubbles"></i></div>
                    </div>
                </div>
            </>
        ) : null;

    } else {
        return (
            <Card>
                <p>Account Not verified</p>
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </Card>


        )
    }
}

  
  
