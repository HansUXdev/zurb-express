/* global moment with npm */
// import moment from 'moment'
import $ from 'jquery';
  window.$ = $;		  window.$ = $;

 	function submitMessage(Message){		
 		$.post("api/Messages/", Post, function(){		
 			// window.location.href = "/";		
 		});		
 	}	
 var componentForm 	= $("#contact-panel");		
 var nameInput 			= $("#message-us-name");		
 var emailInput 		= $("#message-us-email");		
 var messageInput 	= $("#message-us-message");		


$("contact-panel").on("submit", function handleFormSubmit(event) {		
	event.preventDefault();
     var newMessage = {		
     	name: nameInput.val().trim(),		
     	email: emailInput.val().trim(),		
     	message: messageInput.val().trim()		
     };

 	submitMessage(newMessage);	
 	
});
// module.exports = contact = function() {
// };


 // -// module.exports = function(  ){		 +// Optionally import the backend logic
 // -		 +// import contact from '../components/contact-us';
 // -	// closes the panel on click outside		 +
 // -	$(document).mouseup(function (e) {		 +// closes the panel on click outside
 // -	  var container = $('#contact-panel');		 +$(document).mouseup(function (e) {
 // -	  if (!container.is(e.target) // if the target of the click isn't the container...		 +  var container = $('#contact-panel');
 // -	  && container.has(e.target).length === 0) // ... nor a descendant of the container		 +  if (!container.is(e.target) // if the target of the click isn't the container...
 // -	    {		 +  && container.has(e.target).length === 0) // ... nor a descendant of the container
 // -	      container.removeClass('is-active');		 +    {
 // -	    }		 +      container.removeClass('is-active');
 // -	});		
 // -		
 // -  // Gets an optional query string from our url (i.e. ?post_id=23)		
 // -  var url = window.location.search;		
 // -  var postId;		
 // -  // Sets a flag for whether or not we're updating a post to be false initially		
 // -  var updating = false;		
 // -		
 // -  // If we have this section in our url, we pull out the post id from the url		
 // -  // In localhost:8080/cms?post_id=1, postId is 1		
 // -  // if (url.indexOf("?post_id=") !== -1) {		
 // -  //   postId = url.split("=")[1];		
 // -  //   getPostData(postId);		
 // -  // }		
 // -		
 // -  // Getting jQuery references to the post body, title, form, and category select		
 //  var componentForm = $("#message-us-component");		
 //  var nameInput 		= $("#message-us-name");		
 //  var emailInput 		= $("#message-us-email");		
 //  var messageInput 	= $("#message-us-message");		
 // -		
 // -		
 // -  // Adding an event listener for when the form is submitted		
 //   $(componentForm).on("submit", function handleFormSubmit(event) {		
 //     event.preventDefault();		
 //     // Wont submit the post if we are missing a body or a title		
 // 		
 //     // Constructing a newMessage object to hand to the database		
 //     var newMessage = {		
 //     	name: nameInput.val().trim(),		
 //     	email: emailInput.val().trim(),		
 //     	message: messageInput.val().trim()		
 //     };		
 // 		
 //     console.log(newMessage);		
 // 		
 //     // If we're updating a post run updatePost to update a post		
 //     // Otherwise run submitPost to create a whole new post		
 //     if (updating) {		
 //       newMessage.id = messageId;		
 //       updateMessage(newMessage);		
 //     }		
 //     else {		
 //       submitMessage(newMessage);		
 //      }		      }
 //   });		 +});
 // 		
 // 		
 // 	// Submits a new post and brings user to home page upon completion		
 // 	function submitMessage(Message){		
 // 		$.post("api/Messages/", Post, function(){		
 // 			window.location.href = "/";		
 // 		});		
 // 	}		
 // -		
 // -	// Gets post data for a post if we're editing		
 // -	function getMessageData(id){		
 // -		$.get("api/Messages/" + id, function(data){		
 // -			if (data){		
 // -				nameInput.val(data.name);		
 // -				emailInput.val(data.email);		
 // -				messageInput.val(data.message);		
 // -				updating = true;		
 // -			}		
 // -		})		
 // -	}		
 // -		
 // -  // Update a given post, bring user to the home page when done		
 // -  function updateMessages(message) {		
 // -    $.ajax({		
 // -      method: "PUT",		
 // -      url: "/api/Messages",		
 // -      data: message		
 // -    })		
 // -    .done(function() {		
 // -      window.location.href = "/";		
 // -    });		
 // -  }		
 // -		
 // -		
 // -// } 