
function categorySelectionChange() {
    var e = document.getElementById("category");
    var val = e.options[e.selectedIndex].value;

    //console.log("val text is " + e.options[e.selectedIndex].text);

    if (val == -2) {

        document.getElementById("newCategoryDiv").style.display = "inline";

    } else {
        document.getElementById("newCategoryDiv").style.display = "none";
    }
    console.log(e.options[e.selectedIndex].text);
    document.getElementById("categoryTitle").value = e.options[e.selectedIndex].text;

}


