$(document).ready(function() {

$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    handleWindowResize: true,
    googleCalendarApiKey: 'AIzaSyCfy_2FapJeWb0KE--Oobf_LBAEXKcNxRs',
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function(date) {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
        }
        var startTime = date.format();
        var eventStyle = $(this).attr('class').split(' ')[1];

        eventsRef.push().set({
            title: $.trim($(this).text()),
            className: eventStyle,
            start: startTime
        });

        if (eventStyle == 'warming') {
            infoRef.child('warms').transaction(function(value) {
                return value + 1;
            })
        } else if (eventStyle == 'neutral') {
            infoRef.child('neutral').transaction(function(value) {
                return value + 1;
            })            
        }
    },
    eventSources: [
        {
            googleCalendarId: 'en-gb.hong_kong#holiday@group.v.calendar.google.com',
            className: 'HK-holiday'
        },
        {
            googleCalendarId: 'flinhong@gmail.com',
            className: 'gCalendar'
        }
    ]
}); 


// Initialize Firebase
var config = {
apiKey: "AIzaSyCQNPQNTMDuhupa0Xd-PkCSegfZcTV3vLk",
authDomain: "calendar-99c8e.firebaseapp.com",
databaseURL: "https://calendar-99c8e.firebaseio.com",
projectId: "calendar-99c8e",
storageBucket: "calendar-99c8e.appspot.com",
messagingSenderId: "913973957187"
};
firebase.initializeApp(config);

var rootRef = firebase.database().ref();
var eventsRef = rootRef.child('events');
var infoRef = rootRef.child('information');

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

$( "#signin" ).click(function() {
    firebase.auth().signInWithPopup(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var name = user.displayName;
        $( "#signin" ).text('Welcome ' + name + '!');
        $( "#signout" ).toggle();
        $('#external-events .fc-event').each(function() {
            var eventStyle = $(this).attr('class').split(' ').pop();
            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true, // maintain when user navigates (see docs on the renderEvent method)
                editable: true,
                className: eventStyle
            });
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });                   
    }
});

$( "#signout" ).click(function() {
    firebase.auth().signOut().then(function() {
        $( "#signin" ).text('Sign in With Google');
        $( "#signout" ).toggle();        
    }, function(error) {
    // An error happened.
    });
});

eventsRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(value) {
        var event = value.val();
        var eventTitle = event.title;
        var eventclassName = event.className;
        var eventStart = event.start;
        var source = {
            events: [
                {
                    title: eventTitle,
                    start: eventStart,
                    className: eventclassName
                }
            ]
        };
        $('#calendar').fullCalendar('addEventSource', source);
    });
});

});