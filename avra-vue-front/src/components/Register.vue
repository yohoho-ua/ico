<template>
  <div class="login-wrapper border border-light">
    <form class="form-register" @submit.prevent="register">
           <img src="../assets/logo.png">
      <br>
      <h2 class="form-register-heading">Please register</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="alert alert-success" v-if="msg">{{ msg }}</div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <label for="confirmPassword" class="sr-only">Confirm Password</label>
      <input v-model="confirmPassword" type="password" id="ConfirmPassword" class="form-control" placeholder="Confirm Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
     <div class="has_account">
      <p class="form-register-heading">Already has an account?</p>
      <router-link to="/login" class="btn btn-lg btn-primary btn-block">Sign in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: false,
      msg: false
    };
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  methods: {
    checkCurrentLogin() {
      if (this.currentUser) {
        console.log("current user login = " + JSON.stringify(this.currentUser));
        this.$router.replace(this.$route.query.redirect || "/profile");
      }
    },
    register() {
        if(this.password !== this.confirmPassword) {
            this.error = "Passwords do not match"
        } else {
      this.$http
        .post("/signup", { email: this.email, password: this.password })
        .then(request => this.RegisterSuccessful(request))
        .catch(() => this.RegisterFailed());
      console.log(this.email);
      console.log(this.password);
        }
    },
    RegisterSuccessful(req) {
      if (!req.data.success) {
        this.RegisterFailed();
        return;
      }
      this.error = false;
      this.msg = req.data.msg;
      this.$router.replace(this.$route.query.redirect || "/");
    },

    RegisterFailed() {
      if (!req.data.msg) {
        this.error = "Register failed!"
      } else {
         this.error = req.data.msg 
      }
    }
  }
};
</script>

<style lang="css" scoped>
body {
  background: #605b56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
  animation: fadein 0.6s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.form-register {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-register .form-register-heading,
.form-register .checkbox {
  margin-bottom: 10px;
}
.form-register .checkbox {
  font-weight: normal;
}
.form-register .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-register .form-control:focus {
  z-index: 2;
}
.form-register input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-register input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.has_account {
  margin-top: 20px;
}
</style>
