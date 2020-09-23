<template>
  <div id="container">
    <div id="login-title">Fundoo</div>
    <div id="login">Login</div>
    <div id="form-container">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('EmailId')">
          <label for="EmailId">EmailId</label>
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
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            >Log In</md-button
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
      position: "center",
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
            console.log("Logged In", result.status);
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
  left: 30vw;
  top: 10vh;
  width: 40vw;
  height: 80vh;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 2px rgba($color: black, $alpha: 0.2);
}
#login-title {
  font-size: 25px;
  line-height: 25px;
  margin-top: 7vh;
  font-family: "Work Sans", sans-serif;
}
#login {
  font-size: 30px;
  line-height: 30px;
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
  position: relative;
  top: 10vh;
  width: 100%;
}
</style>
