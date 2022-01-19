$(function(){
	if ( window.location.href.indexOf('rent.591.com.tw/home') == -1 ){
		$('body').append(`
			<div id="CBfixed">
				<div style="display: flex">
					<button class="CBbtn" onclick="$('#CBdiv').toggle()">TB</button>
					<button class="CBbtn js-prev" onclick="$('.pagePrev').not('.last').children().click();">←</button>
					<button class="CBbtn js-next" onclick="$('.pageNext').not('.last').children().click();">→</button>
				</div>
				<div id="CBdiv" style="display: none"></div>
			</div>
		`)
		cb_afterRender()
	}
})


function cb_afterRender( To ){
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
	$.each( vm._data.listData, function(idx,ele){
		let td  = `
			<td><a target="_blank" href="https://rent.591.com.tw/home/${ele.post_id}">${ele.title}</a></td>
			<td>${ele.location}</td>
			<td>${ele.floor_str}</td>
			<td>${ele.surrounding.desc = ele.surrounding.type === "subway_station" ? ele.surrounding.desc : "" }</td>
			<td>${ele.surrounding.distance = ele.surrounding.type === "subway_station" ? ele.surrounding.distance.replace('公尺','') : "" }</td>
			<td>${+ele.price.replace(',','')}</td>
		`
		tr += `<tr>${td}</tr>`
	})
	
	$('#CBdiv').html(`
		<table id="CBtable">
			<thead>
				<tr>
					<th>標題</th>
					<th>地點</th>
					<th>樓層</th>
					<th>捷運</th>
					<th>距離</th>
					<th>價格</th>
				</tr>
			</thead>
			<tbody>
				${tr}
			</tbody>
		</table>
	`)
	
	sortTable()
	
	if ( $('.pagePrev').hasClass('first') ){
		$('.CBbtn.js-prev').hide()
	}else{
		$('.CBbtn.js-prev').show()
	}
	
	if ( $('.pageNext').hasClass('last') ){
		$('.CBbtn.js-next').hide()
	}else{
		$('.CBbtn.js-next').show()
	}
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