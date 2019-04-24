import React from 'react';
import {mount} from 'enzyme';
import moxios from 'moxios';
import Root from 'Root'
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name: 'Fetched #1'}, {name: 'Fetched #2'}]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  // Atempt to render the entire App
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // Find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');
  // Introduce a TINY pause

  // Expect to find a list of comments
  moxios.wait(() => {
    wrapped.update();
      expect(wrapped.find('li').length).toEqual(2);

      done();
      wrapped.unmount();
  });

});
