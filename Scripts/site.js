function download(text, name, type)
{
    var a = document.createElement("a");
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
var myJsonObject;
function loadData()
{
    var string = localStorage["myJsonObject"];
    if (string == undefined) string = "{\"Characters\":[],\"Groups\":[]}";
    results = JSON.parse(string);

    myJsonObject = deserialize(results);

    function deserialize(vResults)
    {
        var pmyJsonObject =
            {
                Characters: vResults.Characters.map(function (c) { return new Character(c.name); }),
                Groups: vResults.Groups.map(function (g) { return new Group(g.name); })
            };
        return pmyJsonObject;
    }






}
function saveJsonToCache()
{
    localStorage["myJsonObject"] = JSON.stringify(this.myJsonObject);
}
function resetJsonCase()
{
    localStorage["myJsonObject"] = null;
}


//Object.defineProperty(
//    myDataStructure,
//    "Characters",
//    {
//        get: function () { return this.value; },
//        set: function (y) { this.someFunction(y); }
//    });




function myApp()
{
    let addMenu = new mdc.menu.MDCSimpleMenu(document.querySelector('.addMenu'));
    let sidedrawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    let newCharacterDialogControl = new mdc.dialog.MDCDialog(document.querySelector('#newCharacterDialog'));
    let allTextFields = document.querySelectorAll('.mdc-textfield');


    //# = ID
    //. = class
    //  = tag

    for (var i = 0; i < allTextFields.length; i++) { mdc.textfield.MDCTextfield.attachTo(allTextFields[i]); }


    document.querySelector('.addButton').addEventListener('click', () => addMenu.open = !addMenu.open)      //  FAB
    document.querySelector('.menu').addEventListener('click', () => sidedrawer.open = true);                //  Drawer

  
    document.querySelector('#menuCreateNewCharacter').addEventListener('click', function (evt)
    {
        newCharacterDialogControl.lastFocusedTarget = evt.target;
        newCharacterDialogControl.show();
        var textField = document.getElementById("newCharacterDialog-textfield");
        //textField.focus();
    })

    newCharacterDialogControl.foundation_.cancel = function (shouldNotify)
    {
        if (shouldNotify) { this.adapter_.notifyCancel() }
        var textField = document.getElementById("newCharacterDialog-textfield")
        textField.value = null;
        console.log("Cancel New Character");
        this.close();
    }

    newCharacterDialogControl.foundation_.accept = function (shouldNotify)
    {
        var textField = document.getElementById("newCharacterDialog-textfield");
        if (textField.checkValidity())
        {
            myJsonObject.Characters.push(new Character(textField.value));
            textField.value = null;
            saveJsonToCache();
            this.close();
        }
    }
}

function Character(vName)
{
    this.name = vName;
    this.toString = function () { return this.name; }
}


////newCharacterDialog
//var newCharacterDialogControl = new mdc.dialog.MDCDialog(document.querySelector('#newCharacterDialog'));
//newCharacterDialogControl.listen('MDCDialog:accept', function ()
//{
//    var tfield = document.getElementById("newCharacterDialog-textfield");
//    var tfieldParent = tfield.parentNode;
//    var textfield = new mdc.textfield.MDCTextfield(tfieldParent);
//    if (tfield.checkValidity)
//    {
//        console.log('accepted');
//    }
//    else
//    {
//        console.log("accepted but not valid");
//    }
//    console.log(tfield.value);

//})
//newCharacterDialogControl.listen('MDCDialog:cancel', function ()
//{
//    //Label is getting a float above, need to remove it
//    console.log('canceled');
//    document.getElementById("newCharacterDialog-textfield").value = null;
//    console.log(document.getElementById("newCharacterDialog-textfield").value);
//})







////<!--                      Menu Start                      -->
//var menuEl = document.querySelector('.mdc-simple-menu');
////var lastSelected = document.getElementById('last-selected'); // <--- The target of the result
//menuEl.addEventListener('MDCSimpleMenu:selected', function (evt)
//{
//    const detail = evt.detail;
//    //lastSelected.textContent = '"' + detail.item.textContent.trim() + '" at index ' + detail.index;
//});

