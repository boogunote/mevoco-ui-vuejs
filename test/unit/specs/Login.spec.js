import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LoginPage from 'src/pages/Login'

Vue.use(VueI18n)

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(LoginPage)
    })
    expect(vm.$el.querySelector('#login').tagName)
      .to.equal('BUTTON')
  })
})
