

var CalculatController = (function(){
    

    var Input = function(obj){
        this.personMil = obj.inputPerSonMil;
        this.totalMil = obj.inputTotalMil;
        this.cash = obj.inputCashPament;
        this.beginingRiceBal = obj.inputPerRichBalance;
    };

    var Cost = function(obj){
        this.fixedMil = obj.fixedMil;
        this.totalMilCost = obj.totalMilCost;
        this.extCost = obj.extCost;
        this.totalCost = obj.totalCost;
        this.overDue = obj.overDue;
        this.endingRiceBal = obj.endingRiceBal;
    };
    


   var  data = {
       allData:{
           cost:[],
           input:[]
                }
            };
   var list = [];

   return{


    displayColor: function(obj){
        var overDues, endingRiceBals;

         overDues = data.allData.cost.map(el => el.overDue);
       
        if(obj.overDue < 0){
          var  indexoverDue = overDues.lastIndexOf(obj.overDue);
          
        };

        endingRiceBals = data.allData.cost.map(el =>el.endingRiceBal);  
       
         if (obj.endingRiceBal < 0){
            var endingRiceBal = endingRiceBals.lastIndexOf(obj.endingRiceBal);
         };
         
         return{
             overDue:indexoverDue,
             endingRiceBal: endingRiceBal
         }
         
     },


       addData: function(obj, input){

        newInput = new Input(input)

        newCost  = new Cost(obj)



        
        data.allData.input.push(newInput);
        data.allData.cost.push(newCost);
        list.push(input);
       

       },


       calTotal: function(){

        var totalPsMil = 0;
        var totalFxMil = 0;           
        var totalMilCost = 0;
        var totalExtCost = 0;
        var totalCost = 0;
        var totalCash = 0;
        var totalOverDue = 0; 
        var beginingTotalRiceBal = 0;
        var  totalEndingRiceBal = 0;

  

            data.allData.input.forEach( el => {
                 totalPsMil += el.personMil;
                 totalCash += el.cash;
                 beginingTotalRiceBal += el.beginingRiceBal;

                });


            data.allData.cost.forEach( el => {
                  totalFxMil += el.fixedMil; 
                  totalMilCost += el.totalMilCost;
                  totalExtCost += el.extCost;
                  totalCost += el.totalCost;
                  totalOverDue += el.overDue;
                  totalEndingRiceBal += el.endingRiceBal;
                 

                });

       
        return{
            totalPsMil: totalPsMil,
            totalFxMil: totalFxMil,
            totalMilCost: totalMilCost,
            totalExtCost: totalExtCost,
            totalCost: totalCost,
            totalCash: totalCash,
            totalOverDue: totalOverDue,
            beginingTotalRiceBal: beginingTotalRiceBal,
            totalEndingRiceBal: totalEndingRiceBal

            }

        },

        calTolCost: function(obj){
            var totalMarCost, milRat, fixedMil, totalMilCost, totalMilCost, extCost, totalCost, overDue, endingRiceBal, id;

                totalMarCost = obj.inputTotalMarCost + obj.inputTotalSmlCost;
                milRat = totalMarCost / obj.inputTotalMil;
                fixedMil = (obj.inputPerSonMil >64 ? fixedMil = obj.inputPerSonMil : fixedMil = 65);
                totalMilCost = milRat * (obj.inputPerSonMil > 64 ? obj.inputPerSonMil = obj.inputPerSonMil : 65);
                extCost = obj.inputExtCost / obj.inputTotalMember;
                totalCost = totalMilCost + extCost;
                overDue =  obj.inputCashPament - totalCost  ;
                endingRiceBal = obj.inputPerRichBalance - obj.inputPerSonMil;
                endingRiceBal = (obj.inputPerRichBalance - obj.inputExtRice)- obj.inputPerSonMil;

                id = list.length + 1;

        return{
            totalMarCost: totalMarCost,
            milRat: milRat,
            fixedMil: fixedMil,
            totalMilCost: totalMilCost,
            extCost: extCost,
            totalCost: totalCost,
            overDue: overDue,
            endingRiceBal: endingRiceBal,
            id: id

        };
    },


    

     

       texsting: function(){
        console.log(data);
     }
       
   };
   

})();


var UIController = (function(){


    var DOMString = {
        inputName :".name",
        inputPerSonMil: ".persone_mil",
        inputTotalMil: ".total_mil",
        inputTotalMarCost: ".total_market_cost",
        inputTotalSmlCost: ".total_small_cost",
        inputExtCost: ".total_exta_cost",
        inputCashPament: ".total_pament",
        list_contaner: ".list_contaner",
        inputPerRich_balance: ".perRice_balance",
        inputTotalMember: ".total_member",
        inputExtRice: ".ext_rice"
       

    };


    return{ 
        getInput: function(){
            return{
                inputName: document.querySelector(DOMString.inputName).value,
                inputPerSonMil: parseInt(document.querySelector(DOMString.inputPerSonMil).value),
                inputTotalMil: parseInt(document.querySelector(DOMString.inputTotalMil).value),
                inputTotalMarCost: parseInt(document.querySelector(DOMString.inputTotalMarCost).value),
                inputTotalSmlCost: parseInt(document.querySelector(DOMString.inputTotalSmlCost).value),
                inputExtCost: parseInt(document.querySelector(DOMString.inputExtCost).value),
                inputCashPament: parseInt(document.querySelector(DOMString.inputCashPament).value),
                inputPerRichBalance: parseInt(document.querySelector(DOMString.inputPerRich_balance).value),
                inputTotalMember: parseInt(document.querySelector(DOMString.inputTotalMember).value),
                inputExtRice: parseInt(document.querySelector(DOMString.inputExtRice).value)

                
            };
        },
   
        addListItem:function(obj, input){
           
            var html, newHtml;
            html = '<tr id="%id%"><td>%id%</td><td class="fname" colspan="3">%fname%</td><td class="persone_mil">%persone_mil% </td><td class="fixed_mil">%fixed_mil%</td><td class="mil_rat">%mil_rat%</td><td class="total_mil_cost">%total_mil_cost%</td><td class="exta_cost">%exta_cost%</td><td class="total_cost">%total_cost%</td><td class ="cash_pament"> %cashpament% </td><td class ="over_due"> %overdue% </td><td class ="begining_rice_balance"> %begining_rice_balance% </td><td class ="endning_rice_balance"> %endning_rice_balance% </td></tr>'

            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%id%", obj.id);
            newHtml = newHtml.replace("%fname%", input.inputName);
            newHtml = newHtml.replace("%persone_mil%", input.inputPerSonMil);
            newHtml = newHtml.replace("%fixed_mil%", obj.fixedMil);
            newHtml = newHtml.replace("%mil_rat%", obj.milRat.toFixed(2));
            newHtml = newHtml.replace("%total_mil_cost%", obj.totalMilCost.toFixed(2));
            newHtml = newHtml.replace("%exta_cost%", obj.extCost.toFixed(2));            
            newHtml = newHtml.replace("%total_cost%", Math.round(obj.totalCost));
            newHtml = newHtml.replace("%cashpament%", input.inputCashPament);
            newHtml = newHtml.replace("%overdue%", Math.round(obj.overDue));
            newHtml = newHtml.replace("%begining_rice_balance%", input.inputPerRichBalance);
            newHtml = newHtml.replace("%endning_rice_balance%", obj.endingRiceBal);
           
            
           
            document.querySelector(DOMString.list_contaner).insertAdjacentHTML("beforeend", newHtml);
        },

        clearFields: function(){
                
            var fields = document.querySelectorAll(".persone_data .form-control");
                 fields.forEach((el, i) => {
                      el.value = "";
                      
                     fields[0].focus();
                 });
        },

        
        color: function(index){

            var nameFields = document.querySelectorAll(".fname");
            nameFieldsArr = Array.prototype.slice.call(nameFields);

            if(index.overDue >=0){
                var fieldsOverDue = document.querySelectorAll(".over_due");
                fieldsOverDueArr = Array.prototype.slice.call(fieldsOverDue);
                fieldsOverDueArr[index.overDue].style.color = "red";
               
                nameFieldsArr[index.overDue].style.color = "red";
            }

            if(index.endingRiceBal >=0){
                var fields =  document.querySelectorAll(".endning_rice_balance");
            fieldsArr = Array.prototype.slice.call(fields);
             fieldsArr[index.endingRiceBal].style.color = "red";

             nameFieldsArr[index.endingRiceBal].style.color = "red";
            

            };
             


            
            
         },

      

        displayTotalCost: function(obj, id){

           
            document.querySelector(".mamber").textContent= id.id;
             document.querySelector(".personeMil").textContent= obj.totalPsMil;
             document.querySelector(".totalFixMil").textContent= obj.totalFxMil;
             document.querySelector(".totalMil_cost").textContent= Math.round(obj.totalMilCost);
             document.querySelector(".total_extal_cost").textContent= Math.round(obj.totalExtCost); 
             document.querySelector(".totalCost").textContent= Math.round(obj.totalCost); 
             document.querySelector(".total_cash").textContent= obj.totalCash; 
             document.querySelector(".total_overdue").textContent= Math.round(obj.totalOverDue); 
             document.querySelector(".begining_total_rich").textContent= obj.beginingTotalRiceBal;
             document.querySelector(".ending_total_rich").textContent= obj.totalEndingRiceBal;            
            
             

                       
         },

         displayTime: function(){
             var now, year;
              now = new Date();
              month = now.getMonth();
              year = now.getFullYear();
              months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              time = months[month] + " " + year;
            

              document.querySelectorAll(".time").forEach(el => el.textContent = time);
            }

   
    };


})();

var Controller = (function(CalCtrl, UICtrl){


    var addEventListener = function(){
                document.querySelector(".btn").addEventListener("click", CtrlAddItem);
       
                document.addEventListener("keypress", function(event){
                 if(event.keyCode === 13 || event.which === 13){
                    CtrlAddItem();

                     };
       });
    };
       

       var CtrlAddItem = function(){

        var input, cost, total, index; 


         input = UICtrl.getInput();
         cost = CalCtrl.calTolCost(input);
       if(!isNaN(input.inputTotalMember) && !isNaN(input.inputTotalMil) && !isNaN(input.inputTotalMarCost)  && !isNaN(input.inputTotalSmlCost) && !isNaN(input.inputExtCost) && input.inputName !=="" && !isNaN(input.inputPerSonMil) && !isNaN(input.inputPerRichBalance) && (input.inputTotalMember >= cost.id)  ){
            UICtrl.addListItem(cost, input);
           if (input.inputTotalMember = cost.id){
               document.querySelector(".persone_data").style.display = "none";
       }else{
        document.querySelector(".persone_data").style.display = "block";
    };
           
               
           

            CalCtrl.addData(cost, input);
            total = CalCtrl.calTotal();


            UICtrl.displayTotalCost(total, cost);

            UICtrl.clearFields();
            index = CalCtrl.displayColor(cost);
            UICtrl.color(index);
        }; 
         
  
            
            
          
          
       };
       







    return{
        init:function(){
            console.log("I am start");
            addEventListener();
             //displytime
            UICtrl.displayTime();
        }
    }
  
    
})(CalculatController, UIController);
    Controller.init();
