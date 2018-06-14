$(document).ready(function() {
    CKEDITOR.replace('MoTa', {
        allowedContent: 'iframe[*]'
    })

    loadDanhSachKhoaHoc();


    //Hàm Load Danh sách Khóa học
    function loadDanhSachKhoaHoc() {
        khoaHocService.LayDanhSachKhoaHoc()
            .done(function(result) {
                danhSachKhoaHoc.DSKH = result;
                CardKhoaHoc(danhSachKhoaHoc.DSKH);
            })
            .fail(function(err) {
                console.log(err);
            })

        //Load noi dung the Select trong popup

    }

    //Hàm tạo card danh sách Khóa Học
    function CardKhoaHoc(DSKH) {
        var noidung = "";
        if (DSKH.length !== 0) {
            for (var i = 0; i < DSKH.length; i++) {
                var khoaHoc = DSKH[i];
                noidung +=
                    `
    				 <div class="col-lg-4 thongTinKhoaHoc">
                        <div class="card">
                            <img class="card-img-top HinhAnh" src="${khoaHoc.HinhAnh}" style="width: 100%; height: 250px" alt="Card image cap">
                            <div class="card-block">
                                <h2 class="card-title font-weight-bold text-center TenKhoaHoc mb-5">${khoaHoc.TenKhoaHoc}</h2>
                                <p class="card-text">
                                    <span class="font-weight-bold">Mã Khóa Học: </span>
                                    <span class="MaKhoaHoc">${khoaHoc.MaKhoaHoc}</span>
                                </p>
                                <p class="card-text">
                                    <span class="font-weight-bold">Lượt Xem: </span>
                                    <span class="LuotXem">${khoaHoc.LuotXem}</span>
                                </p>
                                <p class="card-text">
                                    <span class="font-weight-bold">Người Tạo: </span>
                                    <span class="NguoiTao">${khoaHoc.NguoiTao}</span>
                                </p>

                            </div>
                            <div class="card-footer text-center">
                            	<div class="mb-3">
									 <button class="btn btn-primary btnChinhSua" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}">Chỉnh Sửa</button>
                       				 <button class="btn btn-danger btnXoa" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}">Xóa</button>
                            	</div>
                                <a href="#" class="btn btn-warning">Chi tiết khóa học</a>
                            </div>
                        </div>
                    </div>
		    		`
            }
        } else {
            noidung = `<h2 class="text-danger ml-5">Không tìm thấy!</h2>`;
        }
        $("#DanhSachKhoaHoc").html(noidung);
    }


})