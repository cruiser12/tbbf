// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Bind the connection event with the listner1 function
eventEmitter.addListener(
    'newWordFound',
    function()
    {

    });