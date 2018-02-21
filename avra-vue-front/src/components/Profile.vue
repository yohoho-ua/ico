<template>
<section>
  <div class=profile>
    <div class='page-header'>
      <h1>Hi, {{ currentUser.email }}</h1>
    </div>
  <table class="table b-table">
    <thead>
    <tr>
      <th>Address</th>
      <th>Balance</th>
      <th class="col-sm-2">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="wallet in wallets">
      <td class="hex_addr">
        <router-link :to="{name: 'Profile', params: {wallet_id: wallet._id}}">{{ wallet.address }}</router-link>
      </td>
      <td>
        {{ wallet.balance }}
        <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
      </td>
      <td>
        <button class="btn btn-danger btn-xs" v-on:click="walletDelete(wallet._id)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
    <div>
      <button class="btn btn-primary btn-xs" v-on:click="getNew()">Get new Address</button>
    </div>
  </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      wallets: []
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser"
    }),
    fillWallets: function() {}
  },
  created() {
    this.getAll();
  },

  methods: {
    getAll() {
      this.$http
        .get("/wallet/" + this.currentUser.id)
        .then(request => this.buildWalletList(request.data))
        .catch(() => {
          alert("Something went wrong!");
        });
    },
    getNew() {
      this.$http
        .get("/new_wallet/" + this.currentUser.id)
        .then(response => {
          this.getAll();
          this.$router.push("/profile");
        })
        .catch(() => {
          alert("Something went wrong!");
        });
    },
    buildWalletList(data) {
      this.wallets = data;
    },
    walletEdit() {
      this.wallets = data;
    },
    walletDelete(walletId) {
      if (confirm("Removing wallet. Are you sure?")) {
        this.$http
          .delete("/wallet/" + walletId)
          .then(response => {
            this.getAll();
            this.$router.push("/profile");
          })
          .catch(() => {
            alert("Something went wrong!");
          });
      }
    }
  },
  components: {}
};
</script>
<style>
.profile {
  margin-top: 10%;
  margin-left: 25%;
  margin-right: 25%;
  background: #ffffff;
}
.hex_addr {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
}
th {
    background-color: #605B56;
    color: white;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>