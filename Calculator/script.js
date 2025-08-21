const input = document.querySelector(".display input");
const buttons = document.querySelectorAll('input[type="button"]');
buttons.forEach(btn => {
    btn.addEventListener("click", () =>{
        const value = btn.value;
        const lastChar = input.value.slice(-1);
        const operators = ['%','/','*','+','-'];
        if(value === 'AC'){
            input.value="";
        }
        else if(value ==="DEL"){
           input.value= input.value.slice(0,-1);
        }
        else if(value ==="="){
            input.value = eval(input.value);
        }
        else if(operators.includes(value) && operators.includes(lastChar)){
            return;
        }
        else{
            input.value += value;
        }
    })
});

input.addEventListener("mouseover", ()=>{
    if(input.value === "Infinity"){
        input.value = "";
    }
})
