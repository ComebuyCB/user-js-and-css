$(function(){
	$(document).on('click','.photo',function(){
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

	$('body').append(`
		<div class="CB_fixed">
			<button class="CB_btn" onclick="photoMode()">切換大圖</button>
			<div class="CB_div" style="display: none"></div>
		</div>
	`)
})

function photoMode(){
	$('.CB_div').toggle()
	$('body').toggleClass('bodyNowrap')
	
	let section = ''
	$.each( $('.menu__items-wrapper .dish-category-section'), function(idx,item){
		let title = $(item).find('.dish-category-title').text()
		section += `<h3 class="title">${title}</h3>`
		
		let cont = ''
		$.each( $(item).find('.dish-card'), function(){
			let name = $(this).find('[data-testid=menu-product-name]').text()
			let price = $(this).find('[data-testid=menu-product-price]').text()
			let photo
			
			let urlImg = $(this).find('.photo').css('background-image')
			let picture = $(this).find('picture').length > 0
			if (urlImg){
				photo = urlImg.replace( /url\("(.+)"\)/g,'$1').replace( /width=(\d)+/g,'width=600')
			} else if (picture){
				photo = "https://micro-assets.foodora.com/img/logo-simple-fp.svg"
			} else {
				
			}
			
			if ( price == "$ 0" ){
				
			}else{
				cont += `
					<div class="bgImg" style="background-image: url(${photo})">
						<div class="bgTxt">${name} (${price})</div>
					</div>
				`
			}
		})
		section += `<div style="display:flex; flex-wrap: wrap">${cont}</div><hr>`
		
	})
	
	$('.CB_div').html(`
		${section}
	`)
}