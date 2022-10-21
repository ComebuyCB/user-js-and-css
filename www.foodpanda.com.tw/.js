$(function(){
	$(document).on('click','.lazy-loaded-dish-photo', function(){
		let urlImg = $(this).css('background-image')
		let imgSm, imgLg
		if (urlImg){
			imgSg = urlImg.replace( /url\("(.+)"\)/g,'$1')
			imgLg = imgSg.replace( /width=(\d)+/g,'width=800')
		}
		
		$('body').append(`
			<div class="_photoShow" style="background-image: url( ${imgLg} )"></div>
		`)
	})
	
	$(document).on('click','._photoShow',function(){
		$(this).remove()
	})
	
	let CB_detectCart = setInterval(()=>{
		if ( $('.cart-summary-footer').length ){
			$('.cart-summary-footer').prepend('<button id="CB_copyCart">copy</button>')
			clearInterval( CB_detectCart )
		}
	}, 100 )

	$(document).on('click', '#CB_copyCart', function(){
		let str = ''
		let $cartLists = $('.cart-summary-item-list').children()
		$cartLists.each( function(idx, ele){
			let title = $(ele).find('.product-card-name').text()
			let price = $(ele).find('.product-card-price').text()
			let added = ''
			$(ele).find('.cl-interaction-secondary').each( function( sIdx, sEle ){
				added += $(sEle).text() + '\n'
			})
			str += title + '\n' + added + 'total: ' + price + '\n'
			if ( idx !== $cartLists.length - 1){ 
				str += '---\n'
			}
		})
		navigator.clipboard.writeText(str)
	})
})