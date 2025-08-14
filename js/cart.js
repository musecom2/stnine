/*****************************
 * 장바구니 상품추가 (C) addCart() ,  savaCart() 
 * 상품 불러오기 (R)  loadCart()
 * 옵션변경 (U)  수량변경 updateQty()
 * 장바구니 비우기(D)  -- 상품 취소 removeItem(), clearCart()
 * 상품 합계 계산 -- cartTotals()
 */

// localStorage에서 사용할 키 이름
const CART_KEY = "SHOP_CART_V1";

//통화 포멧
const fmtMoney = n => Number(n).toLocaleString('ko-KR');

/*********************************
 *  LOAD CART
 ********************************/
function loadCart(){
    //기존 스토리지에서 데이터를 읽어온다. 없으면 그냥 배열을 만든다.
    try{
         return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }catch(e) {
        //실패해도 그냥 배열을 만든다.
        return [];
    }     
}

/*********************************
 *  SAVE CART
 ********************************/
function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

/********************************
 *  makeItemKey(id, options)
 *  동일상품, 동일옵션인지 판별. 
 *  옵션이 있는 경우에는 키-값 정렬 후에 '|'로 연결
 */
function makeItemKey({ id, options }) {
    //1. Object.keys(options)을 이용 key 배열을 얻는다. 예) ["color", "size"]
    //2. 키를 정렬(sort()) 3. 키:값 문자열로 변환  4. |를 이용해 하나로 결합
    const optPart = options ?
        Object.keys(options).sort().map( k => `${k}:${options[k]}`).join('|')
    :'';
   return `${id}__${optPart}`;   
}
/**********************************
 *  ADD CART
 *********************************/
function addCart(item) {
   const cart = loadCart();  //기존에 등록된 장바구니를 가져온다. 
   const key = makeItemKey(item);
   const idx = cart.findIndex(it => makeItemKey(it) === key); //같은 값이 있는가 판별
   if(idx > 0) {
       //같은 값이 있으면 수량만 증가시키면 됨
       cart[idx].qty += item.qty || 1;
   }else{
       //같은 상품이 없을 때에는 새 항목으로 기존 항목에 추가함.
       cart.push({...item, qty:item.qty || 1});
   }
   saveCart(cart);
   return cart;  //변경된 항목으로 반환
}

/***********************************
 * 상품 수량 변경 
 */
function updateQty(key, qty) {
    const cart = loadCart();
    const idx = cart.findIndex(it => makeItemKey(it) === key);
    if(idx >= 0) {
        cart[idx].qty = Math.max(1, Number(qty) || 1);  //최소수량 1개는 보장함
        saveCart(cart);
    }
    return loadCart();
}

/***********************************
 *   REMOVE CART
 **********************************/
function removeItem(key) {
    const cart = loadCart().filter(it => it.id !== key);
    saveCart(cart);
}

/**************************
 *   REMOVE ALL CART
 */
function clearCart(){
   localStorage.removeItem(CART_KEY);
}
