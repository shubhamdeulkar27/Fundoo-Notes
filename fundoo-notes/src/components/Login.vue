<template>
  <div id="container">
    <div id="login-title">Fundoo</div>
    <div id="login">Login</div>
    <div id="form-container">
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('UserName')">
          <label for="UserName">Username</label>
          <md-input
            name="UserName"
            id="UserName"
            v-model="form.UserName"
            :disabled="sending"
          ></md-input>
          <span class="md-helper-text"
            >You can use letters,numbers,period and @.</span
          >
          <span class="md-error" v-if="!$v.form.UserName.required"
            >Username is required</span
          >
          <span class="md-error" v-else-if="!$v.form.UserName.minlength"
            >Username should have at least six characters</span
          >
          <span
            class="md-error"
            v-else-if="!$v.form.UserName.userNameRegex(this.UserName)"
            >Username Is Invalid (Eg. asdfg@123)</span
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
          <span class="md-helper-text"
            >Should Be Alphanumeric and At least One special character.</span
          >
          <span class="md-error" v-if="!$v.form.Password.required"
            >The Password is required</span
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
  </div>
</template>

<script>
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
        UserName: null,
        Password: null
      },
      position: "center",
      sending: false,
      token: null
    };
  },
  validations: {
    form: {
      UserName: {
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
      this.form.UserName = null;
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
