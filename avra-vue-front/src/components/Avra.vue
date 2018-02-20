<template>
  <div class="avra">
  <div>
    <img src="../assets/logo.png">
  </div>
  <h1>AvraToken</h1>
  <H3>Crowdsale address:
    <span class="black">{{ crowdAddress }}</span>
  </h3>
  <p>Sales start
    <span class="black" >{{ startTime }}</span>
  </p>
  <p>Sales end
    <span class="black" >{{ endTime }}</span>
  </p>
  <h3>You have
    <span class="black" />{{ balance }}</span> AVT</span>
  </h3>
  <p>Your address:
    <span class="black">{{ address }}</span>
    </span>
  </p>

  <h1>Buy Avra</h1>
  <br>
  <label for="buy_amount">Amount:</label>
  <input type="text" id="buy_amount" placeholder="e.g., 95"></input>
  <br>
  <br>
  <button type="button" class="btn btn-info" v-on:click="">Buy</button>
  <br>
  <br>

  <br>
  <h1>Send Avra</h1>
  <br>
  <label for="send_amount">Amount:</label>
  <input type="text" id="send_amount" placeholder="e.g., 95"></input>
  <br>
  <label for="receiver">To Address:</label>
  <input type="text" id="receiver" placeholder="e.g., 0x93e66d9baea28c17d9fc393b53e3fbdd76899dae"></input>
  <br>
  <br>
  <button type="button" class="btn btn-primary" v-on:click="">Send</button>
  <br>
  <br>
  <span id="status"></span>
  <br>
  <br>
  <br>
  <button id="test" onclick="App.test()">Test address</button>
  <span class="hint">
    <strong>Hint:</strong> open the browser developer console to view any errors and warnings.</span>
</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Avra",
  data() {
    return {
      crowdAddress: "0xcfeb869f69431e42cdb54a4f4f105c19c080a601",
      startTime: "20 Feb 2018 12:4:22",
      endTime: "12 Mar 2018 12:4:22",
      balance: 0, 
      address: "0xffcf8fdee72ac11b5c542428b35eef5769c409f0"
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser"
    })
  },
  created() {},

  methods: {},
  components: {}
};
</script>

 <style scoped>

.avra {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 10%;
  font-family: "Open Sans", sans-serif;
}

label {
  display: inline-block;
  width: 100px;
}

input {
  width: 500px;
  padding: 5px;
  font-size: 16px;
}

button {
  width: 120px;
  font-size: 16px;
  padding: 5px;
}

h1,
h2 {
  display: inline-block;
  vertical-align: middle;
  margin-top: 0px;
  margin-bottom: 10px;
}

h2 {
  color: #aaa;
  font-size: 32px;
}

h3 {
  font-weight: normal;
  color: #aaa;
  font-size: 24px;
}

.black {
  color: black;
}

#balance {
  color: black;
}
</style>

