<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Name"
          placeholder="Enter your name" v-model="user.name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Email"
          placeholder="Your Email" type="email" v-model="user.email"
        />
      </CCol>
      <CCol sm="12">
        <CInput
          label="Password"
          placeholder="Password" type="password" v-model="user.password"
        />
      </CCol>
      <CCol col="6" xl="6">
          <CButton
            color="success"
            class="m-2"
            @click.prevent="adduser()"
          >
            Save
          </CButton>
          </CCol>
    </CRow>
    
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "New",
  data() {
    return {
        user :{
        name: "",
        email: "",
        password: "",
        },
        
        validation_errors: [],
        errorMsg: ""
    }
      
  },
  methods: {
    adduser() {
      axios.post(this.getApiUrl + "/register", this.user)
      .then(res => {
        if (res.data.status.error) {
          if (Object.keys(res.data.status.validation_errors).length > 0) {
            this.validation_errors = res.data.status.validation_errors;
          } else {
            this.errorMsg = res.data.status.message;
          }
        } else {
          //localStorage.token = res.data.data.token;
          this.$router.push("/users")
        }
        //
        
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
