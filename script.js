let unOrderedListEl = document.getElementById('burgerList');
unOrderedListEl.innerHTML = '';

let orderedItems = document.getElementById('orederedBurgerList');
orderedItems.innerHTML = '';

let orderStatus = document.getElementById('order_Recieved_Msg');
orderStatus.innerHTML = '';

let paymentStatus = document.getElementById('payment_Status_Msg');
paymentStatus.innerHTML = '';

let thnksMsg = document.getElementById('thanks_Msg');
thnksMsg.innerHTML = '';



// Get menu function
function getmenu(){
    return new Promise((resolve, reject) => {
        fetch("https://free-food-menus-api-production.up.railway.app/burgers").then((response)=> response.json()).then((data)=>{
        let menu = [];
        for (const menuName of data) {
            menu.push(menuName.name);
            unOrderedListEl.innerHTML += `<li>${menuName.name}</li>`
        }
        resolve(menu);
    })
      });
}


//take order function
function take_order(data1){
    let burg1Index = Math.floor(Math.random()*57);
        let burg2Index = burg1Index + 1;
        let burg3Index = burg1Index + 2;
        let burg1 = data1[burg1Index];
        let burg2 = data1[burg2Index];
        let burg3 = data1[burg3Index];
        let obj = {item1: `${burg1}`, item2: `${burg2}`, item3: `${burg3}`};
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
                console.log(`item 1: ${burg1} \n item 2: ${burg2} \n item 3: ${burg3}`);
                document.getElementById('menu').classList.add('hidden');
                orderedItems.innerHTML += `
                <li>Burger1: ${burg1}</li>
                <li>Burger2: ${burg2}</li>
                <li>Burger3: ${burg3}</li>
                `
                resolve(obj)
            }, 2500)
        })
}



//order preparation function
function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            orderStatus.innerHTML += `items added in cart`
            paymentStatus.innerHTML += `<h4 style="color:red;">proceed with payment</h4>`
            console.log({order_status:true, paid:false});
            resolve({order_status:true, paid:false})
        },1500)
    })
}


//Promise chaining

getmenu()
    .then((data1) => take_order(data1))
    .then(() => orderPrep())
    .then(() => payOrder())
    .then(() => thankyouFnc())
    .catch((e) => {
        console.log("ERROR>>>", e);
      });