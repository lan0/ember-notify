import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  notify: service(),

  model() {
    return {
      text: 'Hello, world!',
      closeAfter: 2500,
      html: false
    };
  },

  actions: {
    info: showLevel('info'),
    alert: showLevel('alert'),
    success: showLevel('success'),
    warning: showLevel('warning'),
    component: showLevel('success', {
      component: 'foo-bar',
    }),
  }
});

function showLevel(level, options = {}) {
  return function(model) {
    var message = Object.assign(options, {
      closeAfter: Number(model.closeAfter)
    });
    message[model.html ? 'html' : 'text'] = model.text;
    this.notify.show(level, message);
  };
}
