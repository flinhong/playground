$(document)
  .ready(function() {
    $('.ui.menu .ui.dropdown').dropdown({
      on: 'hover'
    });

    $("#open-note").click(function() {
        $(".modal").modal('setting', 'transition', 'vertical flip').modal('show');
    });

    $("#new-note").click(function() {
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

    var rootRef = firebase.database().ref();
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
            $("#file-info").toggle();
            var notesRef = rootRef.child(userID);
            notesRef.once("value").then(function(snapshot) {
                snapshot.forEach(function(value) {
                    var title = value.key;
                    var html = '<li>' + title +'</li>';
                    $("#note-list").append(html);
                });
            });                       
        }
    });

    $("#signout").click(function() {
        firebase.auth().signOut().then(function() {
            $(".right a .google").toggle();
            $("#signin").toggle();
            $("#signout").toggle();
            $("#file-info").toggle();     
        }, function(error) {
        // An error happened.
        });
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