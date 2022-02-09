import Vue from 'vue'
import Vuetify from 'vuetify'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import TinderCard from '../components/cards/TinderCard'

Vue.use(Vuetify)
describe('TinderCard.vue', () => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(()=> {
    vuetify = new Vuetify()
  })

  it('should do something', () => {
    const wrapper = mount(TinderCard, {
      localVue,
      vuetify
    })
    const event = jest.fn()
    const button = wrapper.find('.v-tab')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    // wrapper.vm.$on('onTab:clicked', event)
    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
})