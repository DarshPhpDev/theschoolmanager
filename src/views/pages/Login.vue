<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div  v-for="(error, index) in validation_errors" :key="index">
                  <p v-for="(key, index) in error" :key="index">
                    {{ key }}
                  </p>
                </div>

                <CInput
                  placeholder="Username"
                  autocomplete="username email"
                  v-model="user.email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                  v-model="user.password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4" @click="login"
                      >Login</CButton
                    >
                  </CCol>
                  <CCol col="6" class="text-right">
                    <!-- <CButton color="link" class="px-0"
                      >Forgot password?</CButton
                    >
                    <CButton color="link" class="d-md-none"
                      >Register now!</CButton
                    > -->
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <!-- <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-sm-down-none"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <CButton color="primary" class="active mt-3">
              Register Now!
            </CButton>
          </CCard> -->
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      validation_errors: [],
      errorMsg: ""
    };
  },
  methods: {
    login() {
      axios.post(this.getApiUrl + "/login", this.user)
      .then(res => {
        if (res.data.status.error) {
          if (Object.keys(res.data.status.validation_errors).length > 0) {
            this.validation_errors = res.data.status.validation_errors;
          } else {
            this.errorMsg = res.data.status.message;
          }
        } else {
          localStorage.token = res.data.data.token;
        }
        this.$router.push("/")
        console.log(res);
      })
      .catch( err => {
        console.log(err)
      })


      
    }
  },
  computed: {
    ...mapGetters(["getApiUrl"])
  }
};
</script>
