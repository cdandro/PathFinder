function download(text, name, type)
{
    var a = document.createElement("a");
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

var baseJsonObject = "{\"Characters\":[],\"Groups\":[]}";

var myJsonObject;
function loadData()
{
    var string = localStorage["myJsonObject"];
    if (string === undefined || string === null || string === "null") string = baseJsonObject;
    results = JSON.parse(string);

    myJsonObject = deserialize(results);

    function deserialize(vResults)
    {
        var pmyJsonObject =
            {
                Characters: vResults.Characters.map(function (c) { return new Character(c); }),
                Groups: vResults.Groups.map(function (g) { return new Group(g); })
            };
        return pmyJsonObject;
    }


    myJsonObject.Characters.forEach(function (c) { CreateNewDrawerIcon(c) });
    myJsonObject.Groups.forEach(function (c) { CreateNewDrawerIcon(c); });

}

function CreateNewDrawerIcon(vTitle)
{
    var target = document.getElementsByClassName("menuItemFolder_Characters")[0];
    target.appendChild(NewMenuItem("person", c.name));
}
function CreateNewDrawerIcon(vTitle)
{
    var target = document.getElementsByClassName("menuItemFolder_Groups")[0];
    target.appendChild(NewMenuItem("group", c.name));
}


function saveJsonToCache()
{
    localStorage["myJsonObject"] = JSON.stringify(myJsonObject);
}

function resetJsonCase()
{
    myJsonObject = JSON.parse(baseJsonObject);
    saveJsonToCache();
}




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
    document.querySelector('.addButton').addEventListener('click', function (f) { addMenu.open = !addMenu.open; });      //  FAB
    document.querySelector('.menu').addEventListener('click', function (f) { sidedrawer.open = true; });                //  Drawer


    document.querySelector('#menuCreateNewCharacter').addEventListener('click', function (evt)
    {
        newCharacterDialogControl.lastFocusedTarget = evt.target;
        newCharacterDialogControl.show();
    });

    newCharacterDialogControl.foundation_.cancel = function (shouldNotify)
    {
        if (shouldNotify) { this.adapter_.notifyCancel(); }
        var textField = document.getElementById("newCharacterDialog-textfield");
        textField.value = null;
        console.log("Cancel New Character");
        this.close();
    };

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
    };
}

function customObject(vName, vID, vType)
{
    this.type = vType
    this.name = vName;
    this.id = vID ? vID : getMaxID(vType);
    this.toString = function () { return this.name; };
}
function Character(vName, vID)
{
    if (typeof vName == "string")
    {
        customObject.call(this, vName, vID, "Characters");
    }
    else if (typeof vName == "object")
    {
        customObject.call(this, vName.name,vName.id, "Characters")
    }
}

function Group(vName, vID)
{
    if (typeof vName == "string")
    {
        customObject.call(this, vName, vID, "Groups");
    }
    else if (typeof vName == "object")
    {
        customObject.call(this, vName.name, vName.id)
    }
}

function getMaxID(vType)
{
    var maxId = 0;
    myJsonObject[vType].forEach(function (c) { maxId = Math.max(c.id, maxId); });
    return maxId + 1;
}

function NewMenuItem(vType, vText)
{
    var html = "";
    var anchor = document.createElement("a");
    var info = document.createElement("i");

    anchor.classList.add("mdc-list-item");
    anchor.href = "#";
    info.classList.add("material-icons");
    info.classList.add("mdc-list-item__start-detail");
    info.setAttribute("aria-hidden", "true");
    info.innerText = vType;
    anchor.innerText = vText;
    anchor.insertBefore(info, anchor.firstChild);

    return anchor;
}


////<!--                      Menu Start                      -->
//var menuEl = document.querySelector('.mdc-simple-menu');
////var lastSelected = document.getElementById('last-selected'); // <--- The target of the result
//menuEl.addEventListener('MDCSimpleMenu:selected', function (evt)
//{
//    const detail = evt.detail;
//    //lastSelected.textContent = '"' + detail.item.textContent.trim() + '" at index ' + detail.index;
//});

