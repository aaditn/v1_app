function myFunction(){
    document.getElementById(myDropDown).class
    List.toggle("show");
}
window.onclick = function(event){
    if (!event.target.matches(' .dropbtn')) {
        var dropdowns= document.get
        ElementsByClass
        Name("dropdown-content");
        var i;
        for(i = 0; i < dropdowns.length; i++){
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
}