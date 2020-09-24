$(document).ready(function(){
	/* =========== open modal window ===========*/
	$('.header-contacts').click(function(){
		$('.popup-wrap').show();
	})
	/* =========== close modal window ===========*/
	$('.popup-close').click(function(){
		$('.popup-wrap').hide();
	})
});