$(document).ready(function() {

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
                            <img class="card-img-top " class="HinhAnh" src="${khoaHoc.HinhAnh}" style="width: 100%; height: 250px" alt="Card image cap">
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
                                <div class="card-text MoTa" style="display:none">
                                    ${khoaHoc.MoTa}
                                </div>
                                <p class="card-text">
                                    <span class="font-weight-bold">Người Tạo: </span>
                                    <span class="NguoiTao">${khoaHoc.NguoiTao}</span>
                                </p>

                            </div>
                            <div class="card-footer text-center">
                                <div class="mb-3">
                                     <button class="btn btn-primary btnChinhSua" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}"><i class="fa fa-pencil"></i></button>
                                     <button class="btn btn-danger btnXoa" MaKhoaHoc= "${khoaHoc.MaKhoaHoc}"><i class="fa fa-trash"></i></button>
                                </div>
                                <a href="#" class="btn btn-warning btnChiTiet" MaKhoaHoc = ${khoaHoc.MaKhoaHoc}>Chi tiết khóa học</a>
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


    // $('.btn-ThemKhoaHoc').click(PopUpThemKhoaHoc());
    // 
    //Gọi đến button btn-ThemKhoaHoc
    $('#btn-ThemKhoaHoc').click(function() {
        // gọi ra popup để thực hiện thêm khóa học
        PopUpThemKhoaHoc();
    });


    //Hàm kiểm tra mã khóa học trùng
    function KiemTraMaKhoaHoc(maKH) {
        khoaHocService.LayDanhSachKhoaHoc()
            .done(function(result) {
                var flag = 0;

                for (var i = 0; i < result.length; i++) {
                    var khoaHoc = result[i]
                    if (khoaHoc.MaKhoaHoc === maKH) {} else {}
                }
            })
            .fail(function(errr) {
                console.log(errr);
            })
            // return flag;
    }
    KiemTraMaKhoaHoc('023540');

    function PopUpThemKhoaHoc() {
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung modal title
        var modalTile = "Thêm Khóa Học";
        //Tạo nội dung cho modal footer: Dùng string template
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm Khóa Học </button>
            <button id="btnDong" class="btn btn-danger">Đóng </button>
        `;

        $(".modal-title").html(modalTile);
        $(".modal-footer").html(modalFooter);
        //Gọi nút open modal
        $("#btnPopupModal").trigger("click");
    }
    //Xử lý sự kiện cho nút đóng gọi nút đóng form của popupmodal
    $("body").delegate("#btnDong", "click", function() {
        $("#btnDongForm").trigger("click");
    })

    //Xử Lý sự kiện click thêm khóa học mới
    $("body").delegate('#btnThem', 'click', function() {
        var maKhoaHoc = $('#MaKhoaHoc').val();
        var tenKhoaHoc = $('#TenKhoaHoc').val();
        var moTa = CKEDITOR.instances["MoTa"].getData();
        var hinhAnh = $('#HinhAnh').val();
        var nguoiTao = LayStorage()[0].HoTen;
        var luotXem = $('#LuotXem').val();

        // Khoi tao doi tuong Khoa Hoc
        var khoaHoc = new KhoaHoc(maKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);
        //goi service de day~ du lieu len Server;
        khoaHocService.ThemKhoaHoc(khoaHoc)
            .done(function(result) {
                swal({
                    title: 'Cập nhật Thành Công!',
                    type: 'success',
                    showConfirmButton: false
                })
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            })
            .fail(function(err) {
                console.log(err);
            });
    })

    //gọi popup chỉnh sửa
    $('body').delegate('.btnChinhSua', 'click', function() {
        //disable ma khoa hoc
        $('#MaKhoaHoc').attr('readonly', true);
        //Lấy ra tài khoản hiện đang đăng nhập
        // var TK = LayStorage()[0].TaiKhoan;
        //Clear du lieu txtF
        $('.txtF').val("");
        //Tạo phần nội dung  cho modal
        var modalTitle = `<h1>Chỉnh Sửa thông tin</h1>`;
        $(".modal-title").html(modalTitle);
        var modalFooter = `
            <button id="btnLuu" class="btn btn-success">Lưu </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $(".modal-footer").html(modalFooter);

        //goi nut Popup modal
        $('#btnPopupModal').trigger('click');

        var trKhoaHoc = $(this).closest('.thongTinKhoaHoc');
        var maKhoaHoc = trKhoaHoc.find('.MaKhoaHoc').html().trim();
        var tenKhoaHoc = trKhoaHoc.find('.TenKhoaHoc').html().trim();
        var hinhAnh = trKhoaHoc.find('img').attr('src');
        var moTa = trKhoaHoc.find('.MoTa').html().trim();
        var luotXem = trKhoaHoc.find('.LuotXem').html().trim();


        //GÁn giá trị vào input
        CKEDITOR.instances['MoTa'].setData(moTa);
        $('#MaKhoaHoc').val(maKhoaHoc);
        $('#TenKhoaHoc').val(tenKhoaHoc);
        $('#LuotXem').val(luotXem);
        $('#HinhAnh').val(hinhAnh);
    })

    $('body').delegate("#btnLuu", 'click', function() {

        var MaKhoaHoc = $("#MaKhoaHoc").val();
        var tenKhoaHoc = $('#TenKhoaHoc').val();
        var moTa = CKEDITOR.instances["MoTa"].getData(); //Lay gia tri tu Editor
        var luotXem = $('#LuotXem').val();
        var hinhAnh = $('#HinhAnh').val();
        var nguoiTao = $('#NguoiTao').val();


        var khoaHoc = new KhoaHoc(MaKhoaHoc, tenKhoaHoc, moTa, hinhAnh, luotXem, nguoiTao);

        khoaHocService.CapNhatKhoaHoc(khoaHoc)
            .done(function(result) {
                swal({
                    title: 'Cập nhật Thành Công!',
                    type: 'success',
                    showConfirmButton: false
                })
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            })
            .fail(function(err) {
                console.log(err);
            })
    })

    //Gọi button xóa khóa học
    $('body').delegate('.btnXoa', 'click', function() {
        var maKH = $(this).attr("MaKhoaHoc");
        khoaHocService.XoaKhoaHoc(maKH)
            .done(function(result) {
                swal({
                    title: 'Bạn Đã Xóa Thành Công!',
                    type: 'success',
                    showConfirmButton: false
                })
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
            })
            .fail(function(err) {
                swal({
                    title: 'Không thể Xóa Khóa học này',
                    text: 'Khóa học đã được ghi danh',
                    type: 'warning',
                    showConfirmButton: true
                })
                console.log(err);
            })
    })

    CKEDITOR.replace('MoTa', {
        allowedContent: 'iframe[*]'
    })


    //Xử Lý sự kiện tìm kiếm
    $("#txtTuKhoa").keyup(function() {

        var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachKhoaHocTK = danhSachKhoaHoc.TimKiemKhoaHoc(tuKhoa);
        CardKhoaHoc(danhSachKhoaHocTK.DSKH);

    })
    
    $('body').delegate('.btnChiTiet','click',function(){
        var maKhoaHoc = $(this).attr('MaKhoaHoc');
        console.log(maKhoaHoc);
        window.location.assign(`./../chiTietKhoaHoc.html?${maKhoaHoc}`);
    })
})