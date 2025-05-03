'use strict';

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password === 'rockstar') ok();
  else fail();
}

let user = {
    name: "John",

    loginOK: function() {
        alert(`${this.name} logged in`);
    },
    loginFail: function() {
        alert(`${this.name} failed to log in`);
    },
};

askPassword(user.loginOK.bind(user), user.loginFail.bind(user));