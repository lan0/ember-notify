/* jshint expr:true */
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { it, describe, before, after } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import { find, click } from 'ember-native-dom-helpers';
import Notify from 'ember-notify';
import hbs from 'htmlbars-inline-precompile';

describe('EmberNotifyComponent | Integration', function() {
  setupComponentTest('ember-notify', {
    integration: true
  });

  before(() => Notify.testing = true);
  after(() => Notify.testing = false);

  it('renders block version', function() {
    this.render(hbs`
      {{#ember-notify messages=messages as |message close|}}
        <a {{action close}} class='close-from-block'>CLOSE</a>
        <span class='message-from-block'>{{message.text}}</span>
      {{/ember-notify}}
    `);

    const dummyMessage = EmberObject.create({text: 'dummy text', visible: true, type: 'alert'});
    this.set('messages', A([ dummyMessage ]));

    // ensure block is yielded
    expect(find('.message-from-block').textContent).to.equal('dummy text');

    // close action is passed
    click('.close-from-block');
    expect(dummyMessage.get('visible')).to.be.false;
  });

  it('it supports components', function() {
    this.render(hbs`{{ember-notify messages=messages}}`);

    const dummyMessage = EmberObject.create({text: 'dummy text', visible: true, type: 'alert', component: 'foo-bar'});
    this.set('messages', [ dummyMessage ]);

    // ensure block is yielded
    expect(find('.custom-component-text').textContent).to.equal('dummy text');
    // close action is passed
    click('.custom-component-close');
    expect(dummyMessage.get('visible')).to.be.false;
  });
});
