import Vue from 'vue'
import LoginPage from 'src/pages/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(LoginPage)
    })
    expect(vm.$el.querySelector('#login').textContent)
      .to.equal('Login')
  })
})
