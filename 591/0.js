$(function(){
	setTimeout(function() {
		$('body').append(`
			<div id="CBfixed">
				<button id="CBbtn" onclick="cb_datchData()" js-popTarget="#CBdiv">TB</button>
				<div id="CBdiv" style="display: none"></div>
			</div>
		`)
		new PopupTargets
	});
})


function cb_datchData(){
	// $('#CBdiv').toggle()
	console.log(vm._data.listData)
	let tr = ""
	$.each( vm._data.listData, function(idx,ele){
		let td  = `<td><a target="_blank" href="https://rent.591.com.tw/home/${ele.post_id}">${ele.title}</a></td>`
			td += `<td>${ele.location}</td>`
			td += `<td>${ele.floor_str}</td>`
			td += `<td>${ele.surrounding.desc = ele.surrounding.type === "subway_station" ? ele.surrounding.desc : "" }</td>`
			td += `<td>${ele.surrounding.distance = ele.surrounding.type === "subway_station" ? ele.surrounding.distance.replace('公尺','') : "" }</td>`
			td += `<td>${ele.price}</td>`
		tr += `<tr>${td}</tr>`
	})
	
	$('#CBdiv').html(`
		<table id="CBtable">
			<thead>
				<tr>
					<th onclick="sortTable(0)">標題</th>
					<th onclick="sortTable(1)">地點</th>
					<th onclick="sortTable(2)">樓層</th>
					<th onclick="sortTable(3)">捷運</th>
					<th onclick="sortTable(4)">距離</th>
					<th onclick="sortTable(5)">價格</th>
				</tr>
			</thead>
			<tbody>
				${tr}
			</tbody>
		</table>
	`)
}


function sortTable(n) {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0
	table = document.getElementById("CBtable")
	switching = true
	dir = "asc"
	while (switching) {
	    switching = false
	    rows = table.rows
	    for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false
			x = rows[i].getElementsByTagName("TD")[n]
			y = rows[i + 1].getElementsByTagName("TD")[n]
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			    	shouldSwitch= true
			    	break
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true
					break
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
			switching = true
			switchcount ++   
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc"
				switching = true
			}
		}
		
	}
}


class PopupTargets {
    constructor(){
        this.targets = []
        if ( $('[js-popTarget]').length > 0 ){
            this.showTarget()
            this.filterTarget()
            this.hideTarget()
        }
    }

    showTarget(){
        // 設置 js-popTarget 的目標，click 後打開目標
        let _this = this
        $('[js-popTarget]').each( function(){
            let target = $(this).attr('js-popTarget')
            _this.targets.push( target )
            $(this).on('click',function(){
                if ( $(this).attr('js-popTargetMode') === 'toggle' ){
                    $(target).toggle()
                } else {
                    $(target).show()
                }
            })
        })
    }

    // 篩選重複
    filterTarget(){
        this.targets.filter( (elem, index, arr)=>{
            return arr.indexOf(elem) === index
        })
    }

    // 按下其他地方時，隱藏目標
    hideTarget(){
        $.each( this.targets, function( index, elem ){
            $(document).click(function(e) {
                let targetName = $(e.target).attr('js-popTarget') ? 
                    $(e.target).attr('js-popTarget') : 
                    $(e.target).closest('[js-popTarget]').attr('js-popTarget')

                /* 隱藏目標條件：
                    1. [按下處html] 是 [目標html] 
                    2. [按下處html] 是 [目標html] 的裡面
                    3. [按下處是開關，開關的目標名字] 等於 [目標名字]
                    4. [按下處的父類是開關，開關的目標名字] 等於 [目標名字]
                    以上皆非，則關閉目標。
                */
                if ( !$(elem).is(e.target) && $(elem).has(e.target).length === 0 && !$(elem).is( $(targetName) ) ) {
                    $(elem).hide()
                }
            })
        })
    }
}