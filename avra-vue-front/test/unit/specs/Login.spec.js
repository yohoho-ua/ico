import Vue from 'vue'
import Login from '@/components/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.form-signin-heading').textContent)
      .to.equal('Please sign in')
    expect(vm.$el.querySelector('.form-signin-heading').textContent)
      .to.equal('Email address')
    expect(vm.$el.querySelector('.form-signin-heading').textContent)
      .to.equal('Please sign in')
  })
})
