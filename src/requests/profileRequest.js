import {app, firebaseFirestore} from "../config/base";

export const addNewUser = async (newUser) => {
    try {
        let {displayName, email, photoURL, phoneNumber, uid, bio} = newUser;
        let existedUser = await getUser(uid);
        displayName = !displayName ? "N/A" : displayName;
        phoneNumber = !phoneNumber ? "N/A" : phoneNumber;
        bio = !bio ? "N/A" : bio;
        let newUserDocument = "";
        if (existedUser) {
            console.log("existedUser");
            console.log(existedUser);
            newUserDocument = await firebaseFirestore.collection("authentication-app").doc(String(uid)).set({
                ...existedUser
            })
        } else {
            newUserDocument = await firebaseFirestore.collection("authentication-app").doc(String(uid)).set({
                displayName, email, photoURL, phoneNumber, uid, bio
            })
        }
        console.log(newUserDocument);
        return newUserDocument;
    } catch (error) {
        console.log(error);
    }
}

export const editUser = async (updatedUser) => {
    try {
        let {displayName, email, phoneNumber, password, bio} = updatedUser;
        const uid = localStorage.getItem("userID");

        var userRef = firebaseFirestore.collection("authentication-app").doc(String(uid));
        const updatedUserDocument = await userRef.update({
            displayName, email, phoneNumber, password, bio
        })
        console.log("updatedUserDocument");
        console.log(updatedUserDocument);
        return updatedUserDocument;
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (uid) => {
    try {
        var docRef = firebaseFirestore.collection("authentication-app").doc(String(uid));
        console.log(docRef);

        const doc = await docRef.get();

        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data();
        } else {
            console.log("No such document!");
        }
        
    } catch (error) {
        console.log("Error getting document:", error);
    }
}