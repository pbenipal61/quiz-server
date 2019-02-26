
function categorySelectionChange() {
    var e = document.getElementById("category");
    var val = e.options[e.selectedIndex].value;
    console.log("val is " + val);
    if (val == -2) {

        document.getElementById("newCategoryDiv").style.display = "flex";

    } else {
        document.getElementById("newCategoryDiv").style.display = "none";
    }
}


