// Require jquery...
import $ from 'jquery';
window.$ = $;

// Optionally import the backend logic
// import contact from '../components/contact-us';

// closes the panel on click outside
$(document).mouseup(function (e) {
  var container = $('#contact-panel');
  if (!container.is(e.target) // if the target of the click isn't the container...
  && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      container.removeClass('is-active');
    }
});
