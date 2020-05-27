<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="6" xl="6">
          Users
          </CCol>
          <CCol col="6" xl="6">
          <CButton
            color="success"
            class="m-2"
            @click.prevent="addnew()"
          >
            AddNew
          </CButton>
          </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            :items="usersapi"
            :fields="fields"
            :items-per-page="5"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center' }"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{ data.item.status }}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  
</template>

<script>
import usersData from "./UsersData";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Users",
  data() {
    return {
      items: usersData,
      fields: [
        { key: "name", label: "Name", _classes: "font-weight-bold" },
        { key: "email", label: "Email", _classes: "font-weight-bold" },
        { key: "created_at", label: "Registered" }
        //{ key: "role" },
        //{ key: "status" }
      ],
      activePage: 1,
      usersapi : []
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      }
    }
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    rowClicked(item, index) {
      this.$router.push({ path: `users/${item.id}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    addnew(){
      this.$router.push('/new/user');
    }
  },
  computed: {
    ...mapGetters(["getApiUrl"]),
    getUsers() {
      axios.get(this.getApiUrl + "/get_users")
      .then(res => {
        if (res.data.status.error) {
         console.log(res)
        } else {
          this.usersapi = res.data.data.users
        console.log(usersapi);
        }
        
        
      })
      .catch( err => {
        console.log(err)
      })


      
    }
  }
};
</script>
