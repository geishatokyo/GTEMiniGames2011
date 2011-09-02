$(function() {
	$('.demo').each(function() {
		var source = $('.demo_source', this);

		source.hide().find('code').text($.trim($('.demo_frame', this).html()));
		$('.view_source', this).click(function() {
			source.toggle();
			return false;
		});
	});
});