'use strict';

//grab a form
const form = document.querySelector('#form-inline');
const form1 = document.querySelector('#form-inline1');

//grab an input
const inputEmail = form.querySelector('#inputEmail');
const inputEmail1 = form1.querySelector('#inputEmail1');


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
              subject: 'Thanks for joining the Commitment waiting list!',
              text: 'Hi There,\n\nThanks for joining the Commitment waiting list. \n\nWe are building a search and vendor rating service that helps you discover products you love on Instagram and reliable vendors to buy from.\n\n We sure would let you know when we launch.\n\nBest,\n\nThe Commitment Team',
              html: 'Hi There,<code><br /></code><code><br /></code>Thanks for joining the Commitment waiting list. <code><br /></code><code><br /></code>We are building a search and vendor rating service that helps you discover products you love on Instagram and reliable vendors to buy from.<code><br /></code><code><br /></code> We sure would let you know when we launch.<br /><br />In the meantime, can you kindly help fill out this survey, it would mean a lot - https://bit.ly/3yjtT3J.<br /><br />Best,<br /><br />The Commitment Team',
            },
          })
        }


    }

//push on form submit
    
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(inputEmail);

            //shows alert if everything went well.
            if(inputEmail.value != "") {
              return alert('Thanks for joining the waiting list. Your email has been captured successfully.');
              inputEmail.value = ""
            }

        })
    

    
      form1.addEventListener('submit', function (evt) {
          evt.preventDefault();
          firebasePush(inputEmail1);

          //shows alert if everything went well.
          if(inputEmail1.value != "") {
            return alert('Thanks for joining the waiting list. Your email has been captured successfully.');
            inputEmail1.value = ""
          }

      })
  
