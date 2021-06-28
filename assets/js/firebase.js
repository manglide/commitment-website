'use strict';

//grab a form
const form = document.querySelector('#form-inline');

//grab an input
const inputEmail = form.querySelector('#inputEmail');


//config your firebase push
const config = {
  apiKey: "AIzaSyB-ot-wgbffwfwtMN9n5PbtQYdLs0sRYcU",
  authDomain: "commitment-web.firebaseapp.com",
  databaseURL: "https://commitment-web-default-rtdb.firebaseio.com",
  projectId: "commitment-web",
  storageBucket: "commitment-web.appspot.com",
  messagingSenderId: "625683969096",
  appId: "1:625683969096:web:3a78bf07c380765eba547d",
  measurementId: "G-7422V5WY24",
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
          firebase.firestore().collection('commitment-web-default-rtdb').add({
            to: input.value,
            message: {
              subject: 'Commitment Early Bird Access!',
              text: 'Hi There,\n\nThank you for joining the Commitment early bird access program. \n\nWe are building something that would enable buyers and sellers shop with confidence online.\n\n We sure would let you know when we launch.\n\nBest,\n\nThe Commitment Team',
              html: 'Hi There,<code><br /></code><code><br /></code>Thank you for joining the Commitment early bird access program. <code><br /></code><code><br /></code>We are building something that would enable buyers and sellers shop with confidence online.<code><br /></code><code><br /></code> We sure would let you know when we launch.<br /><br />In the meantime, can you kindly help fill out this survey, it would mean a lot - https://bit.ly/3yjtT3J.<br /><br />Best,<br /><br />The Commitment Team',
            },
          })
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
