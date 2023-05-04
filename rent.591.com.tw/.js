// 此網站已有 jQuery1.9

$(function(){
	if ( window.location.href.indexOf('rent.591.com.tw/home') > -1 ){
		$(document).on('keydown',(evt)=>{
			if (evt.key === "ArrowRight"){
				$('.photos-detail').find('.next-btn').click();
			}
			if (evt.key === "ArrowLeft"){
				$('.photos-detail').find('.prev-btn').click();
			}
		})
	} else {
		$('body').append(`
			<div id="CBfixed">
				<div style="display: flex">
					<button class="CBbtn" onclick="$('#CBdiv').toggle()">TB</button>
					<button class="CBbtn js-prev" onclick="$('.pagePrev').children().click();">←</button>
					<button class="CBbtn js-next" onclick="$('.pageNext').children().click();">→</button>
				</div>
				<div id="CBdiv" style="display: none"></div>
			</div>
		`)
		cb_afterRender()
	}
})


function cb_afterRender(){
	let t1 = setTimeout(()=>{
		if ( $('#j-loading').css('display') === 'none' ){
			cb_getData()
			vm.$watch('listData', ()=>{
				cb_getData()
			})
		} else {
			cb_afterRender()
		}
		clearTimeout( t1 )
	}, 100 )
}


function cb_getData(){
	console.log(vm._data.listData)
	let tr = ""
	let da = [...vm._data.listData]
	da.sort((a,b)=> {
		let x = +a.surrounding.distance.replace('公尺','')
		let y = +b.surrounding.distance.replace('公尺','')
		if ( x < y ){
			return -1
		} else if ( x > y ){
			return 1
		}
		return 0
	})
	$.each(da, function(idx,ele){
		let { type, desc, distance } = ele.surrounding
		distance = distance ? distance.replace('公尺','') : ""
		if ( distance && distance > 1200 ){ return true }
		
		tr += `
			<tr>
				<td class="imgTd">
					<a class="_img_sm" target="_blank" href="https://rent.591.com.tw/home/${ele.post_id}">
						<img src="${ele.photo_list[0]}" height="28">
					</a>
					<img class="_img_lg" src="${ele.photo_list[0]}" height="150">
				</td>
				<td><a target="_blank" href="https://rent.591.com.tw/home/${ele.post_id}">${ele.title}</a></td>
				<td>${ele.kind_name}</td>
				<td>${ele.location}</td>
				<td>${ele.floor_str}</td>
				<td>${desc || ""}</td>
				<td>${distance || ""}</td>
				<td>${+ele.price.replace(',','')}</td>
				<td>${ele.role_name}</td>
				<td>${ele.area}</td>
				<td>${ele.refresh_time}</td>
			</tr>
		`
	})
	
	$('#CBdiv').html(`
		<table id="CBtable">
			<thead>
				<tr>
					<th>圖片</th>
					<th>標題</th>
					<th>房型</th>
					<th>地點</th>
					<th>樓層</th>
					<th>捷運</th>
					<th>距離</th>
					<th>價格</th>
					<th>人物</th>
					<th>坪數</th>
					<th>更新</th>
				</tr>
			</thead>
			<tbody>
				${tr}
			</tbody>
		</table>
	`)
	
	sortTable()
	
	$('.CBbtn.js-prev').css('display', $('.pagePrev').hasClass('first') ? 'none' : 'block' )
	$('.CBbtn.js-next').css('display', $('.pageNext').hasClass('last') ? 'none' : 'block' )
}


function sortTable(){
	const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
	const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
		v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
		)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
	// do the work...
	document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
		const table = th.closest('table');
		const tbody = table.querySelector('tbody');
		Array.from(tbody.querySelectorAll('tr'))
			.sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
			.forEach(tr => tbody.appendChild(tr) );
	})))
}