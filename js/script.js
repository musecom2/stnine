$(function(){

   $('.nav-item').hover(function(){
     $(this).find('ul.lnb').fadeToggle();
   });

   $('.category').hover(function(){
      const w = $('.container').width();  //container의 가로크기를 읽어 옴
      $('.categorybox').css('width', w+"px"); //categorybox의 가로 크기로 설정함.
      $(this).find('.categorybox').fadeToggle();
   });

   $('.best-cart').mouseenter(function(){
       $(this).find('i').removeClass('ri-shopping-bag-4-line').addClass('ri-shopping-bag-4-fill');
   }).mouseleave(function(){
       $(this).find('i').removeClass('ri-shopping-bag-4-fill').addClass('ri-shopping-bag-4-line');
   });

   $('.best-heart').mouseenter(function(){
       $(this).find('i').removeClass('ri-heart-line').addClass('ri-heart-fill');
   }).mouseleave(function(){
       $(this).find('i').removeClass('ri-heart-fill').addClass('ri-heart-line');
   });

   $(window).on('scroll', function(){
      const navigation = $('.navigation').offset().top;
      if($(this).scrollTop() > 220){
         $('.navigation').css({
            position : 'fixed',
            top: '45px',
            width: '100%'
         });
      }else{
         $('.navigation').css({
            position: 'static'
         })
      }
   });

  setInterval(bestSlide, 8000);

   let wrapperWidth = 0;
   let pgCount = 0;
   const totalPage = 3;

   //페이지버튼 생성
   for(let i=0; i < totalPage; i++){
      if(i==0){ 
              $('#page').append(`<li data-index="${i}" class="active"></li>`);
      }else{
              $('#page').append(`<li data-index="${i}"></li>`);
      }       
   }

 
     function updatePage(){
        $('#page li').removeClass('active')
                     .eq(pgCount).addClass('active');
     }

     function bestSlide(){
        pgCount++;
        if(pgCount == totalPage){
            pgCount = 0;
        }
        updatePage();
   
        $(".slide-wrapper-in").animate({
            left: -wrapperWidth + "px"
        }, 300, function(){
            //1. 첫 번째 슬라이드 복제 후 뒤로 이동
            const first = $('.slide-wrapper-in .slide-page').first();
            first.clone().appendTo('.slide-wrapper-in');
            first.remove();
            $('.slide-wrapper-in').css('left', 0);
        });
     }


    function preBestSlide(){
        pgCount--;
        if(pgCount < 0) {
            pgCount = totalPage - 1;
        }
        updatePage();

        const last = $('.slide-wrapper-in .slide-page').last();
        last.clone().prependTo('.slide-wrapper-in');
        last.remove();

        //css 이용해서 왼쪽으로 미리 이동
        $('.slide-wrapper-in').css('left', -wrapperWidth + "px");

        //slide 애니메이션을 거꾸로 
        $('.slide-wrapper-in').animate({
            left: '0px',
        }, 300, function(){

        });
    }

     $("#prev").on("click", function(){
        preBestSlide();
     });

     $("#next").on("click", function(){
        bestSlide();
     });


fetch("./js/best.json")
.then(res => res.json())
.then(rs => {

   let slidePage = "";
   let colPage = "";
   for(let i = 0; i < 3; i++) {
      colPage = "";

      for(let j =0; j < 8; j++) {
         const index = i * 8 + j;
         const data = rs[index];
         
         //색상처리
         let colorHtml = "";
         data.color.forEach(co => {
            colorHtml += `<span class="${co}"></span>`;
         });

         //상품목록 만들기
         colPage += `
            <div class="col-md-3 my-3">
                        <a href="detail.html?id=${data.id}&mode=best" class="img-best-box">
                            <img src="${data.img}" alt="${data.alt}">
                            <div class="pd-best-box text-center">
                                <div class="pd-color">
                                    ${colorHtml}
                                </div>
                                <div class="best-title">${data.title}</div>
                                <div class="pd-best-pay">
                                <del>${data.cost}원</del>
                                <span class="sail">${data.sale}</span>
                                <span class="money">${data.price}원</span>
                                </div>
                            </div>
                            <div class="btn-box">
                                    <button type="button" 
                                            class="best-cart"   
                                            data-id="${data.id}" 
                                            data-list="best"
                                    >
                                        <i class="ri-shopping-bag-4-line"></i>
                                    </button>
                                    <button type="button" class="best-heart">
                                        <i class="ri-heart-line"></i>
                                    </button>
                            </div>
                        </a>
                    </div>
         `;
      }
      slidePage += `<div class="row slide-page">${colPage}</div>`;

   }
     document.querySelector(".slide-wrapper-in").innerHTML = slidePage;

        const pageHeight = $('.slide-page:first-child').outerHeight(true);
        $('.slide-wrapper').css('height', pageHeight+"px");
        wrapperWidth = $(".slide-wrapper").width();
     
})
.catch(err=> console.error("🤢 데이터 로딩에 실패했습니다.", err));

fetch('./js/list.json')
  .then(res => res.json())
  .then(list => {
      const htmlArr = list.map(data => {
        //색상처리 
        let colorHtml = data.color.map(co=>{
            return `<span class="${co}"></span>`;
        }).join("");
        return `
                <div class="col-md-3 col-12">
                    <a href="detail.html?id=${data.id}&mode=list" class="mycard">
                        <div class="card-img">
                            <img class="card-img-top" src="${data.img}" alt="${data.alt}">
                                <div class="btn-box">
                                    <button type="button" 
                                            class="best-cart"
                                            data-id="${data.id}" 
                                            data-list="list"
                                    >
                                        <i class="ri-shopping-bag-4-line"></i>
                                    </button>
                                    <button type="button" class="best-heart">
                                        <i class="ri-heart-line"></i>
                                    </button>
                                </div><!--/btn-box-->
                        </div><!--/card-img-->
                        <div class="card-body">                  
                            <div class="pd-color">
                            ${colorHtml}
                            </div>
                            <div class="list-title">${data.title}</div>
                            <div class="pd-list-pay">
                                <del>${data.cost}원</del>
                                <span class="sail">${data.sale}</span>
                                <span class="money">${data.price}원</span>          
                            </div>
                        </div><!--card-body-->    
                    </a> 
                </div>   <!--/col-->     
        `;
      });
      document.getElementById("list-item").innerHTML = htmlArr.join("");
  })
  .catch(err => console.error("🤢 데이터 로딩에 실패했습니다.", err));

 //옵션 모달 열기
 $(document).on('click', '.best-cart', function(e){
    e.preventDefault();
    const id = $(this).data("id");
    const list = $(this).data("list");
    openOptionModal(id, list);
 });

 $(document).on('click', '.close', function(e){
    e.preventDefault();
    $(this).closest(".modal").modal('hide');
 });

}); //jquery

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
           $("#cartOption").prepend(inForm);
           $('#cpdColor').html(incolor);
           $("#cpdSize").append(inSize);
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

let slideIndex = 1;
showSlides(slideIndex);

setInterval( function(){
    pushSlides(1)
}, 5000);

const input = document.getElementById("searchInput");
const form = document.getElementById("search");

input.addEventListener("focus", function(){
   form.classList.add('focus');
});

input.addEventListener("blur", function(){
    form.classList.remove("focus");
});

function pushSlides(n){
    showSlides(slideIndex += n);
}
function currentSlides(n){
    showSlides(slideIndex -= n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if(n > slides.length) {
        slideIndex = 1;
    }
    for(i =0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

