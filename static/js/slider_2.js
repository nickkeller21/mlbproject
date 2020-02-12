 // Slider 1
 var slider1 = document.getElementById("gameRange");
 var output1 = document.getElementById("game");
 output1.innerHTML = slider1.value;

 slider1.oninput = function() {
   output1.innerHTML = this.value;
 }

 //Slider 2
 var slider2 = document.getElementById("hitRange");
 var output2 = document.getElementById("hit");
 output2.innerHTML = slider2.value;

 slider2.oninput = function() {
   output2.innerHTML = this.value;
 }

 //Slider 3
 var slider3 = document.getElementById("strikeOutRange");
 var output3 = document.getElementById("so");
 output3.innerHTML = slider3.value;

 slider3.oninput = function() {
   output3.innerHTML = this.value;
 }


 //Slider4
 var slider4 = document.getElementById("walkRange");
 var output4 = document.getElementById("bb");
 output4.innerHTML = slider4.value;

 slider4.oninput = function() {
   output4.innerHTML = this.value;
 }

 //Slider5
 var slider5 = document.getElementById("ppaRange");
 var output5 = document.getElementById("ppa");
 output5.innerHTML = slider5.value;

 slider5.oninput = function() {
   output5.innerHTML = this.value;
 }

 const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2
 })

 $(function() {
   $('input[type=range]').change(getTotal); // not () - you're not calling the function
   getTotal(); // initialy call it
 });

 function getTotal() {
   var first = parseInt(slider1.value) || 0;
   var second = parseInt(slider2.value) || 0;
   var third = parseInt(slider3.value) || 0;
   var fourth = parseInt(slider4.value) || 0;
   var fifth = parseInt(slider5.value) || 0;
   document.getElementById("total").innerHTML = 
   formatter.format(
   first * 79073.89+ 
   second * 51026.93 + 
   third * -192777 + 
   fourth * 36910.38 +
   fifth * -517773.3);
 }