$(function() {
    var maKhoaHoc = window.location.search.substr(1, ).split("&");
    khoaHocService.ChiTietKhoaHoc(maKhoaHoc)
    .done(function(result){
    	console.log(result);
    	var tenKhoaHoc = result.TenKhoaHoc;
    	var LuotXem = result.LuotXem;
    	var nguoiTao = result.NguoiTao;
    	var hinhAnh = result.HinhAnh;
    	var moTa = result.MoTa;
    	$('#TenKhoaHoc').html(tenKhoaHoc);
    	$('#LuotXem').html(LuotXem);
    	$('#NguoiTao').html(nguoiTao);
    	$('.khoaHoc').css({
    		backgroundImage: 'url(' + hinhAnh + ')',
    		
    	});    	
    	$('#MoTa').html(moTa);	
    })
    .fail(function(err){
    	console.log(err);
    })

})