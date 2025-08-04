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

    $(window).on('load', function(){
        const pageHeight = $('.slide-page:first-child').outerHeight(true);
        $('.slide-wrapper').css('height', pageHeight+"px");
    })


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