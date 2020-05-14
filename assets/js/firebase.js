'use strict';

//grab a form
const form = document.querySelector('.form-inline');

//grab an input
const inputEmail = form.querySelector('#inputEmail');


//config your firebase push
const config = {
  apiKey: "AIzaSyD8kg9rKdJ6Z0Ju30QCXWjjxw3ZX6UZhgo",
  authDomain: "commitment-935b5.firebaseapp.com",
  databaseURL: "https://commitment-935b5.firebaseio.com",
  projectId: "commitment-935b5",
  storageBucket: "commitment-935b5.appspot.com",
  messagingSenderId: "782966710150",
};


//create a functions to push
    function firebasePush(input) {


        //prevents from braking
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        //push itself
        if(input.value == "") {
          alert('please enter your email address');
          return false;
        } else {
          var mailsRef = firebase.database().ref('emails').push().set(
              {
                  mail: input.value
              }
          );
        }


    }

//push on form submit
    if (form) {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(inputEmail);

            //shows alert if everything went well.
            if(inputEmail.value != "") {
              return alert('You will be notified when we go live.');
            }

        })
    }
