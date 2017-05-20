$(document)
  .ready(function() {
    $('.ui.menu .ui.dropdown').dropdown({
      on: 'hover'
    });

    $("#new-note").click(function() {
        $("#new-modal").modal('setting', 'transition', 'vertical flip').modal('show');
    });

    $("#new-modal .actions").click(function() {
        var notename = $("#new-modal input[name='note name']").val();
        var notebook = $("#new-modal input[name='notebook']").val();
        if (notename) {
            $("#file-info input").val(notename);
        } else {
            notename = prompt("Please enter a new note name", "Note Name");
            $("#file-info input").val(notename);
        }
        if (notebook) {
            $("#notebook-info input").val(notebook);
        } else {
            $("#notebook-info input").val("Default");
        }
        mainEditor.cm.setValue("");
    });    

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBXiYAPGOYyg25soKJNjMk3nIvWUPLd6uQ",
    authDomain: "markdown-14046.firebaseapp.com",
    databaseURL: "https://markdown-14046.firebaseio.com",
    projectId: "markdown-14046",
    storageBucket: "markdown-14046.appspot.com",
    messagingSenderId: "254678611694"
    };
    firebase.initializeApp(config);

    var databaseRef = firebase.database().ref();
    var storageRef = firebase.storage().ref();
    var provider = new firebase.auth.GoogleAuthProvider();
    var userID;
    var userName;
    var noteContent;

    provider.addScope('https://www.googleapis.com/auth/plus.login');

    $("#signin").click(function() {
        firebase.auth().signInWithPopup(provider);
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userName = user.displayName;
            userID = user.uid;
            var photoUrl = user.photoURL;
            $(".right a .google").toggle();
            $("#signout span").text(userName);
            $("#signout a").prepend("<img src='" + photoUrl + "'>");
            $("#signout a").append('<i class="sign out icon"></i>');
            $("#signin").toggle();
            $("#signout").toggle();
            $("#notebook-info").toggle();
            var notesdataRef = databaseRef.child(userID);
            updateNoteList(notesdataRef);                         
        }
    });

    function updateNoteList(notesdataRef) {
        $("#notebook-list").empty();
        $("#note-list").empty();
        notesdataRef.once("value").then(function(snapshot) {
            var notebooks = snapshot.val();

            $.each(notebooks, function(notebook, notesData) {
                var notebookhtml = '<div class="item" data-tab="' + notebook + '"><i class="fa fa-lg fa-folder-o"></i>' + notebook + '</div>';
                $("#notebook-list").append(notebookhtml);

                var notetab = '<div class="ui tab" data-tab="' + notebook + '">';
                notetab += '<div class="ui relaxed divided list">';
                var notetabinner = '';
                $.each(notesData, function(note, noteinfo) {
                    var innerhtml = '<div class="item"><i class="large file text outline middle aligned icon"></i><div class="content">';
                    innerhtml += '<a class="header">' + noteinfo.filename + '</a>';
                    innerhtml += '<div class="description">Last update: ' + noteinfo.updateAt + '</div></div></div>';
                    notetabinner += innerhtml;
                });
                notetab += notetabinner + '</div></div>';
                $("#note-list").append(notetab);
            });
            
            $('#notebook-list').children(":first").addClass("active");
            $('#note-list').children(":first").addClass("active");
            $('.tabular.menu .item').tab();
        });
    };

    $("#signout").click(function() {
        firebase.auth().signOut().then(function() {
            $(".right a .google").toggle();
            $("#signin").toggle();
            $("#signout").toggle();
            $("#file-info input").val("");
            $("#notebook-info").toggle();
        }, function(error) {
        // An error happened.
        });
    });    

    $("#open-note").click(function() {
        $("#open-modal").modal('setting', 'transition', 'vertical flip').modal('show');
        $("#note-list .item a").each(function() {
            $(this).on("click", function() {
                var fileName = $(this).text();
                var fileNameExt = fileName + ".md";
                var notebook = $(this).closest(".tab").attr("data-tab");
                var notefileRef = storageRef.child(userID).child(notebook).child(fileNameExt);
                $("#open-modal").modal("toggle");
                notefileRef.getDownloadURL().then(function(url) {
                    $.get(url, function(data){
                        mainEditor.cm.setValue(data);
                        $("#file-info input").val(fileName);
                        $("#notebook-info input").val(notebook);
                    });
                }).catch(function(error) {
                // Handle any errors
                });

            });
        });
    }); 

    $("#save-note").click(function() {
        noteContent = $("#noteContent").text();
        var timeStamp = new Date().toLocaleString();
        var file = new Blob([noteContent], { type: "text/plain" });
        var fileName = $("#file-info input").val();
        var fileNameExt = $("#file-info input").val() + ".md";
        var notebook = $("#notebook-info input").val();
        var notedataRef;
        var notefileRef;
        if (notebook) {
            notedataRef = databaseRef.child(userID).child(notebook).child(fileName);
            notefileRef = storageRef.child(userID).child(notebook).child(fileNameExt);
        } else {
            notedataRef = databaseRef.child(userID).child("Default").child(fileName);
            notefileRef = storageRef.child(userID).child("Default").child(fileNameExt);
        }
        
        notedataRef.once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            if (exists) {
                updateFile();
            } else {
                uploadFile();

                var innerhtml = '<div class="item"><i class="large file text outline middle aligned icon"></i><div class="content">';
                innerhtml += '<a class="header">' + fileName + '</a>';
                innerhtml += '<div class="description">Last update: ' + timeStamp + '</div></div></div>';
                $('#note-list div[data-tab="'+notebook+'"] .list').append(innerhtml);
            }
        });

        function uploadFile() {
            notedataRef.set({
                filename: fileName,
                updateAt: timeStamp
            });
            var uploadTask = notefileRef.put(file);
        };

        function updateFile() {
            notefileRef.delete().then(function() {
                uploadFile();
            }).catch(function(error) {
            // Uh-oh, an error occurred!
            });
        }

    });

  })
;

var mainEditor;
      
function themeSelect(id, themes, lsKey, callback)
{
    var select = $("#" + id);
    for (var i = 0, len = themes.length; i < len; i ++)
    {                    
        var theme = themes[i];  
        select.append("<div class='item'>" + theme + "</div>");
    }
    select.children().click(function(){
        var theme = $(this).text();
        if (theme === "")
        {
            alert("theme == \"\"");
            return false;
        }        
        localStorage[lsKey] = theme;
        callback(select, theme);             
    });
    return select;
}

$(function() {                
    mainEditor = editormd("editormd", {
        width : "100%",
        codeFold : true,
        saveHTMLToTextarea : true,
        searchReplace : true,
        emoji : true,
        taskList : true,
        tocm : true,
        tex : true,
        flowChart : true,
        sequenceDiagram : true,

        toolbarIcons : function() {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|", "help", "info"]
        },

        // Editor.md theme, default or dark, change at v1.5.0
        // You can also custom css class .editormd-preview-theme-xxxx
        theme        : (localStorage.theme) ? localStorage.theme : "default",
        
        // Preview container theme, added v1.5.0
        // You can also custom css class .editormd-preview-theme-xxxx
        previewTheme : (localStorage.previewTheme) ? localStorage.previewTheme : "default", 
        
        // Added @v1.5.0 & after version is CodeMirror (editor area) theme
        editorTheme  : (localStorage.editorTheme) ? localStorage.editorTheme : "default", 
        path         : './assets/editormd/lib/'
    });
    
    themeSelect("editormd-theme-select", editormd.themes, "theme", function($this, theme) {
        mainEditor.setTheme(theme);
    });
    
    themeSelect("editor-area-theme-select", editormd.editorThemes, "editorTheme", function($this, theme) {
        mainEditor.setCodeMirrorTheme(theme); 
        // or mainEditor.setEditorTheme(theme);
    });
    
    themeSelect("preview-area-theme-select", editormd.previewThemes, "previewTheme", function($this, theme) {
        mainEditor.setPreviewTheme(theme);
    });          
});