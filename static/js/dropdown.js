function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
  var players = ['Luis Severino',
  'Aaron Nola',
  'Shane Bieber',
  'Dustin Pedroia',
  'Joey Votto',
  'Andrew McCutchen',
  'Justin Upton',
  'Jed Lowrie',
  'Chris Davis',
  'Brett Gardner',
  'Elvis Andrus',
  'Justin Turner',
  'Michael Brantley',
  'Buster Posey',
  'Giancarlo Stanton',
  'J.D. Martinez',
  'Charlie Blackmon',
  'Manny Machado',
  'Tommy Pham',
  'Aaron Hicks',
  'Nolan Arenado',
  'Christian Yelich',
  'Ender Inciarte',
  'Didi Gregorius',
  'Kevin Kiermaier',
  'Xander Bogaerts',
  'Jose Altuve',
  'Marcell Ozuna',
  'Andrelton Simmons',
  'Jonathan Schoop',
  'Kolten Wong',
  'Adam Eaton',
  'George Springer',
  'Yoenis Cespedes',
  'Anthony Rendon',
  'Javier Baez',
  'Francisco Lindor',
  'Marcus Semien',
  'J.T. Realmuto',
  'Nick Ahmed',
  'Jackie Bradley Jr.',
  'Ketel Marte',
  'Jorge Polanco',
  'Carlos Correa',
  'Byron Buxton',
  'Corey Seager',
  'Jose Ramirez',
  'Kevin Pillar',
  'Chris Taylor',
  'Mookie Betts',
  'Jose Abreu',
  'Kris Bryant',
  'Rafael Devers',
  'Jeff McNeil',
  'Cody Bellinger',
  'Yoan Moncada',
  'Alex Bregman',
  'Ronald Acuna Jr.',
  'Juan Soto',
  'John Lackey',
  'Zack Greinke',
  'Cole Hamels',
  'Ervin Santana',
  'Justin Verlander',
  'Jon Lester',
  'Johnny Cueto',
  'David Price',
  'Gio Gonzalez',
  'Clayton Kershaw',
  'Carlos Carrasco',
  'Max Scherzer',
  'Charlie Morton',
  'Madison Bumgarner',
  'Rick Porcello',
  'Andrew Cashner',
  'Jake Arrieta',
  'Stephen Strasburg',
  'Mike Minor',
  'Lance Lynn',
  'Corey Kluber',
  'Julio Teheran',
  'Aaron Sanchez',
  'Jameson Taillon',
  'Patrick Corbin',
  'Carlos Martinez',
  'Tanner Roark',
  'Noah Syndergaard',
  'Dallas Keuchel',
  'Trevor Bauer',
  'Gerrit Cole',
  'Sonny Gray',
  'Jose Quintana',
  'Robbie Ray',
  'Blake Treinen',
  'Hyun-Jin Ryu',
  'Eduardo Rodriguez',
  'Lucas Giolito',
  'Mike Clevinger',
  'Jacob deGrom',
  'Marcus Stroman',
  'Masahiro Tanaka',
  'Kyle Hendricks',
  'Blake Snell',
  'Jack Flaherty',
  'Kyle Freeland',
  'Michael Fulmer',
  'German Marquez',
  'Mike Soroka',
  'Luis Castillo',
  'David Ortiz',
  'Adrian Beltre',
  'Miguel Cabrera',
  'Jose Bautista',
  'Edwin Encarnacion',
  'Curtis Granderson',
  'Ian Kinsler',
  'Robinson Cano',
  'Nelson Cruz',
  'Lorenzo Cain',
  'Jason Heyward',
  'Josh Donaldson',
  'Mike Moustakas',
  'Freddie Freeman',
  'Carlos Santana',
  'Zack Cozart',
  'Brandon Crawford',
  'Logan Forsythe',
  'A.J. Pollock',
  'Dee Gordon',
  'Avisail Garcia',
  'DJ LeMahieu',
  'Anthony Rizzo',
  'Kyle Seager',
  'Starling Marte',
  'Mike Trout',
  'Bryce Harper',
  'Jason Kipnis',
  'Brian Dozier',
  'Matt Carpenter',
  'Paul Goldschmidt',
  'Jean Segura',
  'Trevor Story',
  'Brandon Nimmo',
  'Whit Merrifield',
  'Matt Olson',
  'Mitch Haniger',
  'Joey Wendle',
  'Aaron Judge',
  'Max Muncy',
  'Matt Duffy',
  'Ozzie Albies',
  'Matt Chapman',
  'Chris Sale'];
  
  
  /*initiate the autocomplete function on the "myInput" element, and pass along the players array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), players);

  /*get last time the page was refreshed*/

  document.getElementById("date").innerHTML = Date();

  /*filter csv*/
  $(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  /*Table Pagination*/

  $(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });

  // Basic example
$(document).ready(function () {
  $('#dtBasicExample').DataTable({
    "paging": true // false to disable pagination (or any other option)
  });
  $('.dataTables_length').addClass('bs-select');
});

// Basic example
$(document).ready(function () {
  $('#dtBasicExample').DataTable({
    "pagingType": "simple" // "simple" option for 'Previous' and 'Next' buttons only
  });
  $('.dataTables_length').addClass('bs-select');
});