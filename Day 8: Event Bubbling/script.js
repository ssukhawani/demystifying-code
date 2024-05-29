document.querySelector("#outer").addEventListener("click", () => {
    console.log("Outer was clicked");
});

document.querySelector("#middle").addEventListener("click", () => {
    console.log("Middle was clicked");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("Inner was clicked");
});

// For event capturing, the third argument useCapture in the syntax of 
// addEventListener should be set to true.
document.querySelector("#outer1").addEventListener("click", () => {
    console.log("Outer was clicked");
}, true);

document.querySelector("#middle1").addEventListener("click", () => {
    console.log("Middle was clicked");
}, true);

document.querySelector("#inner1").addEventListener("click", () => {
    console.log("Inner was clicked");
}, true);
