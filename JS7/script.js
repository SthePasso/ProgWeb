let i=0;
let j=0;
(function(){
    window.addEventListener("mousemove", function(e){
        i=i+1;  
        j=8;  
        let div = document.createElement("div");
        div.setAttribute("id", i);
        div.style.backgroundColor = "blue";
        div.style.height = "12px";
        div.style.width = "12px";
        div.style.borderRadius = "6px";
        div.style.boxShadow = "0 0 4px 0 blue";
        div.style.position = "absolute";
        div.style.left = `${e.clientX}px`;
        div.style.top = `${e.clientY}px`;
        document.body.appendChild(div);
        while(document.getElementById(i-j) !== null){
            document.getElementById(i-j).remove();
            j++;
            console.log('oi');
        }
    })
})();
