$(document).ready(function () {
  $('p > img').each(function(){
    $(this).addClass('materialboxed responsive-img');
    const caption = $(this).attr('alt');
    $(this).attr('data-caption', caption);
  });
  $('.aa-input-search').focusout(function(){
    $('.aa-dropdown-menu').css('display', 'none')
  })
  $('.aa-input-search').focusin(function(e){
    if(e.target.value){
      $('.aa-dropdown-menu').css('display', 'block')
    }
  })
  $('table').addClass('responsive-table')
  $('.sidenav').sidenav();
  $('.collapsible').collapsible({
    onOpenStart: function(el){ $('.drop-icon').css('transform', 'rotate(90deg)')  },
    onCloseStart: function(el){ $('.drop-icon').css('transform', 'rotate(0deg)')  },
  });
  $('.tabs').tabs();
  $('.materialboxed').materialbox();
});