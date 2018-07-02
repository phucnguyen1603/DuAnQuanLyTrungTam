$(function() {

    // =========================================
    //ham Tao danh sach cac khoa hoc da duoc ghi danh
    function CacKhoaHoc(DSKH) {
        var noidung = "";
        if (DSKH.length !== 0) {
            for (var i = 0; i < DSKH.length; i++) {
                var khoaHoc = DSKH[i];
                noidung +=
                    `
                    <div class = "col-lg-4 mb-4 chuyenDong" >
                        <div class = "card KhoaHoc" >
                            <div class = "card-hover" >
                                <img class = "card-img-top layer-img" src = "${khoaHoc.HinhAnh}" alt = "Card image cap" >
                                <h3 class = "card-title tenKhoaHoc font-weight-bold" >${khoaHoc.TenKhoaHoc}</h3>
                                <div class = "chiTiet">
                                    <button class = "btn btn-warning chiTietKhoaHoc" data-taiKhoan='${khoaHoc.MaKhoaHoc}'> Chi tiết </button>
                                </div> 
                                <div class = "bg-gray"></div> 
                                <div class = "bg-gradient"></div> 
                                <div class = "vien"></div>
                            </div>
                            <!-- end card-hover -->
                            <div class = "card-footer" >
                                <div class = "thongtin text-left ml-" >
                                    <p class = "nguoiTao 1 mb-1" >
                                    <img src = "https://picsum.photos/200/300/?random" class="mr-3" style='width:30px;height:30px; border-radius:50%'>${khoaHoc.NguoiTao}</p> 
                                </div> 
                            </div>
                        </div> 
                    </div>
                    <!-- end col-lg-4 -->
            `
            }
        } else {
            noidung = `<p class="font-weight-bold">Không tìm Thấy!!!</p>`;
        }

        $('.CacKhoaHoc').html(noidung);
    }

    //Load thong tin cac khoa hoc da duoc ghi danh
    var taiKhoan = LayStorage()[0].TaiKhoan;
    khoaHocService.LayThongTinKhoaHoc(taiKhoan)
        .done(function(result) {
            if (result !== "Did not find the course") {
                if (result.length    < 4) {
                    $('#footer').addClass('fixed-bottom');
                }
                var mangMaKhoaHoc = [];
                for (var i = 0; i < result.length; i++) {
                    var khoaHoc = result[i];
                    khoaHocService.ChiTietKhoaHoc(khoaHoc.MaKhoaHoc)
                        .done(function(ketqua) {
                            danhSachKhoaHoc.ThemKhoaHoc(ketqua);
                            CacKhoaHoc(danhSachKhoaHoc.DSKH);
                        })
                        .fail(function(err) {
                            console.log(err);
                        })
                }
            } else {
                $('.CacKhoaHoc').html('Không có khóa học nào được ghi danh');
                $('#footer').addClass('fixed-bottom');
            }

        })
        .fail(function(err) {
            console.log(err);
        })

    //Tìm kiếm Khóa học theo tên
    //Xử Lý sự kiện tìm kiếm
    $("#txtTuKhoa").keyup(function() {

        var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachKhoaHocTK = danhSachKhoaHoc.TimKiemKhoaHoc(tuKhoa);
        CacKhoaHoc(danhSachKhoaHocTK.DSKH);

    })

    $('body').delegate('.chiTietKhoaHoc', 'click', function() {
        var maKhoaHoc = $(this).attr('data-taiKhoan');
        window.location.assign(`../Views/chiTietKhoaHoc.html?${maKhoaHoc}`);
    })

    // TweenMax.staggerFrom($('.chuyenDong'), 1, {
    //     top: 150,
    //     opacity: 0
    // },0.3);
})