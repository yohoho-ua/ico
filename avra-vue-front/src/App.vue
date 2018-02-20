<template>
  <div id='app'>
    <template v-if="currentUser">
      <Navbar></Navbar>
    </template>
    <div class='container-fluid'>
      <router-view></router-view>
      <template v-if="currentUser">
        <Foot></Foot>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'
// import Profile from '@/components/Profile'

export default {
  name: 'app',
  components: {
    Navbar,
    Foot
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    checkCurrentLogin () {
      console.log('profile current user : ' + JSON.stringify(this.currentUser))
      if (!this.currentUser && this.$route.path !== '/') {
        this.$router.push('/?redirect=' + this.$route.path)
      }
    }
  }
}
</script>

<style>

</style>
