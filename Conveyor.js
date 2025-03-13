let cb1Speed = 1, cb2Speed = 1;
let stack = [];
let removalMethod = "top";

function setSpeed(belt, speed) {
    if (belt === 'cb1') {
        cb1Speed = speed;
        document.getElementById("cb1Speed").innerText = speed;
    } else {
        cb2Speed = speed;
        document.getElementById("cb2Speed").innerText = speed;
    }
}

function setRemovalMethod(method) {
    removalMethod = method;
}

function addBox() {
    let box = document.createElement("div");
    box.className = "box";
    document.getElementById("cb1Belt").appendChild(box);
    
    setTimeout(() => {
        box.style.transform = "translateX(280px)";
        setTimeout(() => {
            document.getElementById("cb1Belt").removeChild(box);
            stack.push(box);
            updateStack();
        }, 500);
    }, 100);
}

function removeBox() {
    if (stack.length === 0) return;
    let boxToRemove = removalMethod === "top" ? stack.pop() : stack.shift();
    if (boxToRemove) {
        document.getElementById("stack").removeChild(boxToRemove);
    }
    updateStack();
}

function updateStack() {
    document.getElementById("stackCount").innerText = stack.length;
    let stackContainer = document.getElementById("stack");
    stackContainer.innerHTML = "";
    stack.forEach(() => {
        let stackedBox = document.createElement("div");
        stackedBox.className = "box";
        stackContainer.appendChild(stackedBox);
    });
}

setInterval(() => {
    addBox();
}, 1000 / cb1Speed);

setInterval(() => {
    removeBox();
}, 1000 / cb2Speed);
