

var CalculatController = (function(){
    


   var  data = [];

   return{
       total: function(input){

        // var totalMil = 

        

        

       },

       addData: function(obj){

        data.push(obj);

       },

        calTolCost: function(obj){
            var totalMarCost, milRat, totalMilCost, totalMilCost, extCost, totalCost, overDue, id;

         totalMarCost = obj.inputTotalMarCost + obj.inputTotalSmlCost;
         milRat = totalMarCost / obj.inputTotalMil;
         totalMilCost = milRat * obj.inputPerSonMil;
         extCost = obj.inputExtCost / 23;
         totalCost = totalMilCost + extCost;
         overDue = obj.inputCashPament - totalCost;
       
             id = data.length + 1;
     
        
       

        return{
            totalMarCost: totalMarCost,
            milRat: milRat,
            totalMilCost: totalMilCost,
            extCost: extCost,
            totalCost: totalCost,
            overDue: overDue,
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
        fname: ".fname",
        fixed_mil:".fixed_mil",
        mil_rat: ".mil_rat",
        total_mil_cost: ".total_mil_cost",
        exta_cost: ".exta_cost",
        total_cost: ".total_cost"

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
                inputCashPament: parseInt(document.querySelector(DOMString.inputCashPament).value)
                
            };
        },
   
        addListItem:function(obj, input){
            var html, newHtml;
            html = '<tr id="%id%"><td>%id%</td><td class="fname">%fname%</td><td class="fixed_mil">%fixed_mil%</td><td class="mil_rat">%mil_rat%</td><td class="total_mil_cost">%total_mil_cost%</td><td class="exta_cost">%exta_cost%</td><td class="total_cost">%total_cost%</td><td class ="cash_pament"> %cashpament% </td><td class ="over_due"> %overdue% </td></tr>'

            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%id%", obj.id);
            newHtml = newHtml.replace("%fname%", input.inputName);
            newHtml = newHtml.replace("%fixed_mil%", input.inputPerSonMil);
            newHtml = newHtml.replace("%mil_rat%", obj.milRat.toFixed(2));
            newHtml = newHtml.replace("%total_mil_cost%", obj.totalMilCost.toFixed(2));
            newHtml = newHtml.replace("%exta_cost%", obj.extCost.toFixed(2));            
            newHtml = newHtml.replace("%total_cost%", Math.round(obj.totalCost));
            newHtml = newHtml.replace("%cashpament%", input.inputCashPament);
            newHtml = newHtml.replace("%overdue%", Math.round(obj.overDue));

            document.querySelector(DOMString.list_contaner).insertAdjacentHTML("beforeend", newHtml);
        },
   
    };


})();

var Controller = (function(CalCtrl, UICtrl){


    //    document.querySelector(".btn").addEventListener("click", function(){
    //       var input = UICtrl.getInput();
    //       console.log(input);
    //       CalCtrl.adItem(input);
    //       var cost = CalCtrl.calTolCost(input);
    //             UICtrl.addListItem(cost, input);
         

    //    });
    var addEventListener = function(){
                document.querySelector(".btn").addEventListener("click", CtrlAddItem);
       
                document.addEventListener("keypress", function(event){
                 if(event.keyCode === 13 || event.which === 13){
                    CtrlAddItem();

                     };
       });
    };
       

       var CtrlAddItem = function(){


        var input = UICtrl.getInput();
       if(input.inputName !=="" && !isNaN(input.inputPerSonMil) && !isNaN(input.inputTotalMil) && !isNaN(input.inputTotalMarCost) && !isNaN(input.inputTotalSmlCost) && !isNaN(input.inputExtCost) ){
                var cost = CalCtrl.calTolCost(input);
                UICtrl.addListItem(cost, input);
                CalCtrl.addData(cost);
       };

       };
       







    return{
        init:function(){
            console.log("I am start");
            addEventListener();
        }
    }
  
    
})(CalculatController, UIController);
    Controller.init();