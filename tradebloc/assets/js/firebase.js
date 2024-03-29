'use strict';

//grab a form
const form = document.querySelector('#contact-form');
const form1 = document.querySelector('#newsletterform');

//grab an input
const inputName = form.querySelector('#name');
const inputEmail = form.querySelector('#email');
const inputMessage = form.querySelector('#message');

const useremail = form1.querySelector('#newsletteremail');


//config your firebase push
const config = {
  apiKey: "AIzaSyAbxocxyQvsnt1bHFkG34OuBFuWSzNoND4",
  authDomain: "tradebloc-web.firebaseapp.com",
  databaseURL: "https://tradebloc-web-default-rtdb.firebaseio.com/",
  projectId: "tradebloc-web",
  storageBucket: "tradebloc-web.appspot.com",
  messagingSenderId: "220655318098",
  appId: "1:220655318098:web:f4fc3decea36ffecb29b8b",
  measurementId: "G-ML7LP8V50Q"
};


// add user email
function firebasePushUserEmail(email) {


  //prevents from braking
  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }

  //push itself
  if(email.value == "") {
    alert('please enter your email');
    return false;
  } else {
    var mailsRef = firebase.database().ref('newsletter-tradebloc').push().set(
        {
            newsletter: {
              email: email.value
            }
        }
    );
    firebase.firestore().collection('tradebloc-web-default-rtdb').add({
      to: email.value,
      message: {
        subject: 'You have opted in ',
        text: 'Hi There,\n\nThank you for your interest in our weekly TradeBloc Newsletter.\nWe hope to impact your life positively.\n\nBest,\n\nThe Tradebloc Team.',
        html: 'Hi There,<br />Thank you for your interest in our weekly TradeBloc Newsletter. <br />We hope to impact your life positively <br /><br />Best,<br />The TradeBloc Team.',
      },
    })
  }


}

//create a functions to push
    function firebasePush(name, email, message) {


        //prevents from braking
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        //push itself
        if(name.value == "") {
          alert('please enter your name');
          return false;
        } else if(email.value == "") {
          alert('please enter your email address');
          return false;
        } else if(message.value == "") {
          alert('message field cannot be blank');
          return false;
        } else {
          var mailsRef = firebase.database().ref('tradebloc-web-default-rtdb').push().set(
              {
                  contact: {
                    name: name.value,
                    email: email.value,
                    message: message.value
                  }
              }
          );
          firebase.firestore().collection('tradebloc-web-default-rtdb').add({
            to: "info@tradebloc.io",
            message: {
              subject: 'User Enquiry from ' + name.value + '. ',
              text: 'Hi There,\n\nMessage from ' + email.value + '\n\n  '+message.value+' .\n\nBest,\n\nThe Tradebloc Team.',
              html: 'Hi There,<br />Message from '+ email.value + '<br /><br />'+message.value+'<br /><br />Best,<br /><br />The TradeBloc Team.',
            },
          });
          firebase.firestore().collection('tradebloc-web-default-rtdb').add({
            to: email.value,
            message: {
              subject: 'We got your message ' + name.value + '. ',
              text: 'Hi There,\n\nThank you for contacting TradeBloc.\nWe would get back to you shortly.\n\nBest,\n\nThe Tradebloc Team.',
              html: 'Hi There,<br />Thank you for contacting TradeBloc. <br />We would get back to you shortly <br /><br />Best,<br />The TradeBloc Team.',
            },
          })
        }


    }

//push on form submit
    
        if(form) {
          form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(inputName, inputEmail, inputMessage);

            //shows alert if everything went well.
            if(inputEmail.value != "" && inputName.value != "" && inputMessage.value != "") {
              return alert('Thanks for your feedback, we would get back at you.');
            }

          })
        }

        if(form1) {
          form1.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePushUserEmail(useremail);
  
            //shows alert if everything went well.
            if(useremail.value != "") {
              return alert('Thanks for your interest in our Newsletter. We would keep in touch.');
            }
  
          });
        }
    
