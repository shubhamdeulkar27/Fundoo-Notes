<template>
  <div id="container">
    <div id="login-title">
      <span id="logo">
        <i class="fas fa-sticky-note"></i>
      </span>
      <span class="blue">F</span>
      <span class="red">u</span>
      <span class="green">n</span>
      <span class="red">D</span>
      <span class="green">o</span>
      <span class="blue">o</span>
    </div>
    <div id="login">Sign in</div>
    <div id="login-helper">Use your Google Account</div>
    <div id="form-container">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('EmailId')">
          <label for="EmailId">Email</label>
          <md-input
            name="EmailId"
            id="EmailId"
            v-model="form.EmailId"
            :disabled="sending"
          ></md-input>

          <span class="md-error" v-if="!$v.form.EmailId.required"
            >EmailId is required</span
          >
          <span class="md-error" v-else-if="!$v.form.EmailId.minlength"
            >EmailId should have at least six characters</span
          >
        </md-field>
        <md-field :class="getValidationClass('Password')">
          <label for="Password">Password</label>
          <md-input
            name="Password"
            id="Password"
            v-model="form.Password"
            type="password"
            :disabled="sending"
          ></md-input>

          <span class="md-error" v-if="!$v.form.Password.required"
            >Password is required</span
          >
          <span class="md-error" v-else-if="!$v.form.Password.minlength"
            >Invalid Password</span
          >
        </md-field>

        <md-card-actions>
          <md-button
            class="md-dense md-primary"
            href="http://fundoonotes.incubation.bridgelabz.com"
            >Create Account</md-button
          >
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            >Sign in</md-button
          >
        </md-card-actions>
      </form>
    </div>
    <md-snackbar
      :md-position="position"
      :md-active.sync="isLogin"
      md-persistent
    >
      <span>Login Successful!</span>
      <md-button type="submit" class="md-primary" :disabled="sending"
        >Ok</md-button
      >
    </md-snackbar>
    <md-snackbar
      :md-position="position"
      :md-active.sync="invalidCredentials"
      md-persistent
    >
      <span>Invalid Credentials!</span>
      <md-button class="md-primary" @click="invalidCredentials = false"
        >Ok</md-button
      >
    </md-snackbar>
  </div>
</template>

<script>
import userService from "../services/userService.js";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        EmailId: null,
        Password: null
      },
      position: "left",
      sending: false,
      isLogin: false,
      invalidCredentials: false,
      token: null
    };
  },
  validations: {
    form: {
      EmailId: {
        required,
        minLength: minLength(6)
      },
      Password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    login() {
      this.sending = true;
      let user = {
        email: this.form.EmailId,
        password: this.form.Password,
        cartId: ""
      };
      userService
        .login(user)
        .then(result => {
          if (result.status == "200") {
            this.isLogin = true;
            //console.log("Logged In", result.data.email);
            localStorage.setItem("fundoo-token", result.data.id);
            localStorage.setItem(
              "fundoo-user-firstName",
              result.data.firstName
            );
            localStorage.setItem("fundoo-user-lastName", result.data.lastName);
            localStorage.setItem("fundoo-user-email", result.data.email);
            window.location.href = "/dashboard";
          }
        })
        .then(() => {
          this.sending = false;
          this.clearForm();
        })
        .catch(error => {
          console.log("Error:", error.response.status);
          if (error.response.status == "401") {
            this.invalidCredentials = true;
            this.clearForm();
            this.sending = false;
          }
        });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.EmailId = null;
      this.form.Password = null;
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  position: relative;
  left: 32.5vw;
  top: 10vh;
  width: 35vw;
  height: 80vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 2px rgba($color: black, $alpha: 0.2);
}
#login-title {
  font-size: 25px;
  line-height: 25px;
  margin-top: 8vh;
  font-family: "Work Sans", sans-serif;
}
#logo {
  color: orange;
  font-size: 25px;
  margin-right: 0.5vw;
}
#login {
  font-size: 27px;
  line-height: 27px;
  position: relative;
  top: 4vh;
}
#login-helper {
  font-size: 17px;
  position: relative;
  top: 7vh;
}
#form-container {
  position: relative;
  top: 15%;
  left: 10%;
  width: 80%;
}
.md-card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: 10vh;
  width: 100vw;
}
.red {
  color: red;
}
.green {
  color: rgb(26, 202, 26);
}
.blue {
  color: blue;
}
//Moto G4
@media (min-width: 320px) and (max-width: 360px) {
  #container {
    width: 80vw;
    left: 10vw;
  }
}
//Media query For Moto G4 Horizontal.
@media (min-width: 570px) and (max-width: 640px) {
  #container {
    width: 80vw;
    left: 10vw;
    top: 5vh;
    height: 90vh;
  }
  #login-title {
    display: none;
  }
  #login {
    font-size: 20px;
  }
  .md-field {
    margin-bottom: 5px;
  }
}

//Ipad
@media (min-width: 700px) and (max-width: 768px) {
  #container {
    width: 80vw;
    left: 10vw;
    position: relative;
  }
  #login-title {
    font-size: 40px;
  }
  #login {
    font-size: 45px;
    position: absolute;
    top: 16vh;
    left: 30vw;
  }
  #login-helper {
    font-size: 31px;
    position: absolute;
    top: 25vh;
    left: 15vw;
  }
  .md-field {
    font-size: 30px;
  }
  #form-container {
    position: relative;
    top: 30%;
    left: 10%;
    width: 80%;
  }
  .md-card-actions {
    position: absolute;
    bottom: -35vh;
    width: 63vw;
  }
  .md-button.md-dense {
    font-size: 22px;
  }
  .md-button {
    font-size: 22px;
  }
}
//Ipad Horizontal
@media (min-width: 1000px) and (max-width: 1024px) {
  #container {
    width: 80vw;
    left: 10vw;
    position: relative;
  }
  #login-title {
    font-size: 30px;
  }
  #login {
    font-size: 35px;
    position: absolute;
    top: 20vh;
    left: 35vw;
  }
  #login-helper {
    font-size: 25px;
    position: absolute;
    top: 30vh;
    left: 25vw;
  }
  .md-field {
    font-size: 30px;
  }
  #form-container {
    position: relative;
    top: 30%;
    left: 10%;
    width: 80%;
  }
  .md-card-actions {
    position: absolute;
    bottom: -35vh;
    width: 63vw;
  }
  .md-button.md-dense {
    font-size: 20px;
  }
  .md-button {
    font-size: 20px;
  }
}
</style>
