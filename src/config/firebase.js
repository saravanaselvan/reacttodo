const firebase = window.firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const todoDB = firebase.database().ref("todos");

export default firebase;