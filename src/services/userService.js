import { request } from "./../utils/request";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACa906cLsAcOp6Wk8Jthp457--ietT9PI",
  authDomain: "movieology-15eab.firebaseapp.com",
  databaseURL: "https://movieology-15eab.firebaseio.com",
  projectId: "movieology-15eab",
  storageBucket: "movieology-15eab.appspot.com",
  messagingSenderId: "417357365093",
  appId: "1:417357365093:web:7ad260dfa52275f25a2b8c"
};
firebase.initializeApp(firebaseConfig);

/* firebase authentication methods */
export const fireAuth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default class UserService {
  async googleAuth() {
    const user = await fireAuth.signInWithPopup(googleAuthProvider);
    const googleProfile = user.additionalUserInfo.profile;
    this.obtainProfile(googleProfile);
    return user;
  }

  async obtainProfile({ id, name, family_name, picture }) {
    const profile = await this.getProfile(id);
    if (profile) {
      return profile;
    }
    const userProfile = {
      userId: id,
      first_name: name,
      last_name: family_name,
      photo_max_orig: picture
    };

    const createdUser = await request("post", "profiles", "api", userProfile);
    localStorage.setItem("userId", id);
    return createdUser;
  }

  async signOut() {
    const signedOut = await fireAuth.signOut();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    return signedOut;
  }

  async getProfile(userId) {
    const [profile = null] = await request(
      "get",
      `profiles/?userId=${userId}`,
      "api"
    );
    if (profile) {
      localStorage.setItem("userId", profile.id);
      return profile;
    }
    return null;
  }

  showImage(url) {}
}
