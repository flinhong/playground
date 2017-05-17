var mainEditor;

function themeSelect(id, themes, lsKey, callback)
{
    var select = $("#" + id);
    
    for (var i = 0, len = themes.length; i < len; i ++)
    {                    
        var theme    = themes[i];
        var selected = (localStorage[lsKey] == theme) ? " selected=\"selected\"" : "";
        
        select.append("<option value=\"" + theme + "\"" + selected + ">" + theme + "</option>");
    }
    
    select.bind("change", function(){
        var theme = $(this).val();
        
        if (theme === "")
        {
            alert("theme == \"\"");
            return false;
        }
        
        console.log("lsKey =>", lsKey, theme);
        
        localStorage[lsKey] = theme;
        callback(select, theme);
    }); 
    
    return select;
}

$(function() {                
    mainEditor = editormd("test-editormd", {
        width        : "90%",
        height       : 720,

        toolbarIcons : function() {
            // Or return editormd.toolbarModes[name]; // full, simple, mini
            // Using "||" set icons align right.
            return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "code-block", "table", "datetime", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|", "help", "look"]
        },

        // Editor.md theme, default or dark, change at v1.5.0
        // You can also custom css class .editormd-preview-theme-xxxx
        theme        : (localStorage.theme) ? localStorage.theme : "default",
        
        // Preview container theme, added v1.5.0
        // You can also custom css class .editormd-preview-theme-xxxx
        previewTheme : (localStorage.previewTheme) ? localStorage.previewTheme : "default", 
        
        // Added @v1.5.0 & after version is CodeMirror (editor area) theme
        editorTheme  : (localStorage.editorTheme) ? localStorage.editorTheme : "default", 
        path         : './lib/'
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
var noteData;

provider.addScope('https://www.googleapis.com/auth/plus.login');

$( "#loginGoogle" ).click(function() {
    firebase.auth().signInWithPopup(provider);
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userName = user.displayName;
        userID = user.uid;
        var notesRef = rootRef.child(userID);
        var time = new Date();
        time = time.toLocaleTimeString();
        $("form").toggle();
        $(".auth").toggle();
        $(".optin").toggle();
        $("label[for='user-name'] span").text(userName);
        $("label[for='update-time'] span").text(time);
        notesRef.once("value").then(function(snapshot) {
            snapshot.forEach(function(value) {
                var title = value.key;
                var html = '<option value="' + title +'">' + title +'</option>';
                $("#note-list").append(html);
            });
        });
    }
});

$("#signout").click(function() {
    firebase.auth().signOut().then(function() {
        $(".auth").toggle();
        $("form").toggle();
        $(".optin").toggle();        
    }, function(error) {
    // An error happened.
    });
});

$("#save").click(function() {
    var fileName = $("#fname").val();
    if (fileName == "笔记名称" || "") {
        var popUp = prompt("请更新笔记名称");
        fileName = popUp;
        $("#fname").val(fileName);
    };
    var pathkey = decodeURI(fileName.replace(new RegExp('\\/|\\.', 'g'),"_"));
    var noteRef = rootRef.child(userID).child(pathkey);
    noteData = $("#noteData").text();
    var updateTime = new Date();
    updateTime = updateTime.toLocaleTimeString();
    writeNoteData(noteRef, fileName, noteData, updateTime);
    var html = '<option value="' + fileName +'">' + fileName +'</option>';
    $("#note-list").append(html);
    $('.indicator').animate({width:'100%'}, 2000);
    $('.indicator').animate({width:0}, 1);
});

function writeNoteData(noteRef, fileName, noteData, updateTime) {
  noteRef.set({
    title: fileName,
    noteContent: noteData,
    update : updateTime
  });
}

$("#note-list").change(function() {
    $("#note-list option:selected").each(function() {
        mainEditor.clear();
        var pathkey = $(this).text();
        var noteRef = rootRef.child(userID).child(pathkey);
        noteRef.once("value").then(function(snapshot) {
            var data = snapshot.val();
            var contents = data.noteContent;
            mainEditor.cm.setValue(contents);
            $("#fname").val(data.title);
            $("label[for='update-time'] span").text(data.update);
        })
    })
});