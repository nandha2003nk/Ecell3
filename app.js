// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0hA2Bc74PEzeuoahNApERIEkxFqv_jSo",
  authDomain: "techteamexpansion23.firebaseapp.com",
  projectId: "techteamexpansion23",
  storageBucket: "techteamexpansion23.appspot.com",
  messagingSenderId: "542718392377",
  appId: "1:542718392377:web:bf6178e1b28494fe8c35e8",
  measurementId: "G-39B1R2EWV2"
};

//firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//variable
const db = firestore.collection("Register");

//get form
let submitButton = document.getElementById("submit");

//event listener
submitButton.addEventListener("click", (e) => {
  //prevent default form submission
  e.preventDefault();

  //get values
  let name = document.getElementById("name").value;
  let branch = document.getElementById("branch").value;
  let email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  firestore
    .collection("fomData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const fn = doc.data().fname;
        if (firstName === fn) {
          console.log("Already Exists");
        }


      });
    });


  // validate inputs
  if (name === "" || branch === "" || email === "" || phoneNumber === "") {
    alert("Please fill in all fields.");
    return;
  }

  // validate name and branch 
  var nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Name should only contain letters.");
    return;
  }

  // validate email 
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  var branchRegex = /^[A-Za-z\s]+$/;
  if (!branchRegex.test(branch)) {
    alert("Branch should only contain letters.");
    return;
  }

  // validate phone number 
  var phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }


  //Save Form Data To Firebase
  db.doc(name + "_" + branch)
    .set({
      name: name,
      branch: branch,
      email: email,
      phoneNumber: phoneNumber
    })
    .then(() => { })
    .catch((error) => {
      console.log(error);
    });


  //alert
  alert(" KUDOS! Your Form Has Been Submitted");

  //clear form after submission
  function clearForm() {
    document.getElementById("clearFrom").reset();
  }
  clearForm()
});