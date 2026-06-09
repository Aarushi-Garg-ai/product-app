let display=document.getElementById("display");
let list=document.getElementById("productlist");
let search=document.getElementById("search");
let text=document.getElementById("sea");
let filter=document.getElementById("filter")

fetch("https://dummyjson.com/products").then(data=>{data.json().then((res)=>{
    
        function displayall(data){
            let product=document.createElement('div');
            product.classList.add("products");

            product.innerHTML=`
            <img src="${data.thumbnail}" alt="Loading Image ;)">
            <div id="info">
            <b>Id:</b> ${data['id']}<br>
            <b>Title:</b> ${data['title']}<br>
            <b>Desciption:</b> ${data['description']}<br> 
            <b>Category:</b> ${data['category']}<br>
            <b>Price:</b> ${data['price']}<br>
            </div>
            <div id="cart">
                <i id="addtocart" class="fa-solid fa-cart-arrow-down fa-lg" style="color: rgb(9, 8, 6);"></i>
            </div>`;
            list.appendChild(product);
        }

        display.addEventListener("click",()=>{
            list.innerHTML=''
            res.products.forEach( (data)=>{  
            displayall(data);
        })
    })

        search.addEventListener("click",()=>{
            list.innerHTML='';
            let input=parseInt(text.value);
            console.log(input)

            let check=res.products.find((data)=>{
                return data.id==input;
                })
            if (check){
                displayall(check);
            }    
            else{
                list.innerHTML="<p id='err'> OOPs :( Product not found!</p>";
            }
        });
// new feature
        filter.addEventListener("change",()=>{
            list.innerHTML='';
            if(filter.value=="Ascending Order"){
                res.products.forEach(data=>{
                    displayall(data)})
                }
            else if(filter.value=="Descending Order"){
                let sortproduct=res.products.toSorted((a,b)=>b.id-a.id);
                sortproduct.forEach(data=>displayall(data))
            }
            else if(filter.value=="A-Z"){
                let sortproduct=res.products.toSorted((a,b)=>a.title.localeCompare(b.title));
                sortproduct.forEach(data=>displayall(data))
            }
            else if(filter.value=="Z-A"){
                let sortproduct=res.products.toSorted((a,b)=>b.title.localeCompare(a.title));
                sortproduct.forEach(data=>displayall(data))
            }
            else{
                res.product.forEach(data=>displayall(data));
            }
        });

        // let cart=document.getElementById("icon1");
        // cart.addEventListener('click',(i)=>{

        // })

        // let AddToCart=document.getElementById("addtocart");
        // AddToCart.addEventListener("click",()=>{
        //     console.log(data.id);
        //     return data.id;

        // })


})})