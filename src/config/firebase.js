const firebase = window.firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const DB = firebase.database();

export default firebase;
