$(function(){
     /********detail */
 $(".smimg>img").click(function(){
    const imgname = $(this).attr("src");
    $(".lgimg>img").attr("src", imgname);
 });

});  //jquery

/** detail 일때 정보 받음 */
const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));
const mode = params.get("mode");
if(id && mode) {
    openOptionModal(id, mode);
}


function openOptionModal(id, list){
    
    //사이즈
    
    //color

    let thislist = "";
    if(list === "best"){
       thislist = "./js/best.json";
    }else{
       thislist = "./js/list.json";
    }

    fetch(thislist)
    .then(res => res.json())
    .then(rs => {
           const ct = rs.find( it => Number(it.id) === id);
           if(!ct) throw new Error(`id=🤢 ${id} 번호에 맞는 상품을 찾을 수 없습니다.`);
           let cartHtml = `
            
           `;
           document.getElementById("optionTitle").innerHTML = `${ct.title} 상품 <small>옵션 선택</small>`;
            let incolor = ct.color.map(co=>{
                 return `<label><input type="radio" class="color" name="color" value="${co}"><span class="${co}"></span></label>`;
           }).join("");

            let inSize = ct.size.map( sz => {
                return `<option value="${sz}">${sz}</option>`;
            }).join("");
            
            let price = ct.price.replace(",", "");

            let inForm = `<input type="hidden" id="pdtitle" name="pdtitle" value="${ct.title}">
                          <input type="hidden" id="pdprice" name="pdprice" value="${price}">
            `;
           $("#detailForm").prepend(inForm);
           $('#cpdColor').html(incolor);
           $("#cpdSize").append(inSize);
           $(".dprice").text(ct.price.toLocaleString("ko-KR") + "원");
           $(".dsale").text(ct.cost.toLocaleString("ko-KR") + "원");
           $(".thimg").html(`<img src="${ct.img}" alt="${ct.alt}">`);
           
        })  
    .catch(err => console.error("🤢 데이터 로딩에 실패했습니다.", err));

    $("#optionModal").modal('show');
}

$(document).on("click", "#upqut", function(){
   let q = Number($("#optqut").val());
   let price = Number($("#pdprice").val());
   q++;
   price = price * q;
   const kprice = price.toLocaleString("ko-KR");
   $("#optqut").val(q);
   $("#result").html(`합계 : ${kprice} 원 <small>(${q}개)</small>`);
});

$(document).on("click", "#downqut", function(){
let q = Number($("#optqut").val());
let price = Number($("#pdprice").val());
   q--;
   if(q < 1) {
      q = 1;
   }
   price = price * q;
   const kprice = price.toLocaleString("ko-KR");
   $("#optqut").val(q);
   $("#result").html(`합계 : ${kprice} 원 <small>(${q}개)</small>`);
});

$(document).on('change','input[name="color"], select[name="size"]', allOption);

function allOption(){
    let color = $('input[name="color"]:checked').val();
    let size = $('select[name="size"]').val();
    // console.log("컬러" + color);
    // console.log("사이즈" + size);
    if(color && size ) {
       const title = $("#pdtitle").val();
       const price = Number($("#pdprice").val());
       const quintity = Number($("#optqut").val());
       const kprice = price.toLocaleString("ko-KR");
       const rs = `${title} - (색상: ${color} - 사이즈: ${size}) : <strong>${kprice}원</strong>`;
       
       //최종가격 가격 x 수량
       const rsprice = (price * quintity).toLocaleString("ko-KR");
       $("#result").html(`합계 : ${rsprice} 원 <small>(${quintity}개)</small>`);

       $('.setpd').html(rs);
       $('.qyt').removeClass('d-none').addClass('d-flex');
    }else{
       $('.setpd').text("");
       $('.qyt').removeClass('d-flex').addClass('d-none');
    }

}