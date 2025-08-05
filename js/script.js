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

    $(window).on('load', function(){
        const pageHeight = $('.slide-page:first-child').outerHeight(true);
        $('.slide-wrapper').css('height', pageHeight+"px");
        wrapperWidth = $(".slide-wrapper").width();

     });
  
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
            first.clone().appendTo('.slide-wrapper-in')
            first.remove();
            $('.slide-wrapper-in').css('left', 0);
        });

     }



}); //jquery

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