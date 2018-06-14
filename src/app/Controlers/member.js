$(document).ready(function() {

    //gọi ra hàm LoadDanhSachNguoiDung
    LoadDanhSachNguoiDung();


    //Hàm load danh sách người dùng ra bảng
    function LoadDanhSachNguoiDung() {
        nguoiDungService.LayThongTinNguoiDung()
            .done(function(result) {
                danhSachNguoiDung.DSND = result;
                // BangDanhSachNguoiDung(danhSachNguoiDung.DSND);
                CardNguoiDung(danhSachNguoiDung.DSND);

            })
            .fail(function(err) {
                console.log(err);
            })
    }
    //Hàm tạo card danh sách người dùng
    function CardNguoiDung(DSND) {
        var noidung = "";
        if (DSND.length !== 0) {
            for (var i = 0; i < DSND.length; i++) {
                var nguoiDung = DSND[i];
                if (nguoiDung.HoTen !== "null" && nguoiDung.TaiKhoan !== "null" && nguoiDung.Email !== "null" && nguoiDung.SoDT !== "null" && nguoiDung.MatKhau !== "null" && !isNaN(nguoiDung.SoDT) && nguoiDung.TenLoaiNguoiDung !== "null") {
                    noidung +=
                        `
                    <div class="col-lg-4 p-1 thongTinNguoiDung">
       
                        <div class="card">
                            <img class="card-img-top" style="width: 70px; height: 70px; border-radius: 50%;  margin-left: 40%;margin-top:10px" src="https://picsum.photos/200/300/?random" alt="Card image cap">
                            <div class="card-block">
                                <h4 class="card-title text-center pb-5 HoTen">${nguoiDung.HoTen}</h4>
                                    <div class="card-body">

                                    </div>
                                    <p class="card-text ">
                                        <span class="font-weight-bold">Tài Khoản: </span>
                                        <span class="TaiKhoan">${nguoiDung.TaiKhoan}</span>
                                    <p>
                                    <p class="card-text ">
                                        <span class="font-weight-bold">Mật Khẩu: </span>
                                        <span class="MatKhau">${nguoiDung.MatKhau}</spann>
                                    <p>
                                    <p class="card-text">
                                        <span class="font-weight-bold">Email: </span>
                                        <span class="Email">${nguoiDung.Email}</span>
                                    <p>
                                    <p class="card-text">
                                        <span class="font-weight-bold">Số ĐT: </span>
                                        <span class="SoDT">${nguoiDung.SoDT}</span>
                                    <p>
                                    <p class="card-text ">
                                        <span class="font-weight-bold">Loại Người Dùng: </span>
                                        <span class="TenLoaiNguoiDung">${nguoiDung.TenLoaiNguoiDung}</span>
                                    <p>
                            </div>
                            <div class="card-footer p-2 text-center">
                                <button class="btn btn-primary btnSua" data-TaiKhoan="${nguoiDung.TaiKhoan}">Chỉnh Sửa</button>
                                <button class="btn btn-danger btnXoa" data-TaiKhoan="${nguoiDung.TaiKhoan}">Xóa</button>
                                <button class="btn btn-warning btnGhiDanh" data-TaiKhoan="${nguoiDung.TaiKhoan}">Ghi Danh</button>
                            </div>
                        </div>
                    </div>


            `
                }
            }
        } else {
            noidung = `<h2 class="text-danger ml-5">Không tìm thấy!</h2>`;
        }


        $("#DanhSachNguoiDung").html(noidung);
    }

    //Hàm xóa 
    $('body').delegate(".btnXoa", "click", function() {
        var taiKhoan = $(this).attr("data-TaiKhoan");
        var TKDangNhap = LayStorage()[0].TaiKhoan;
        swal({
            title: 'Bạn Chắc chắn muốn xóa?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                //Lấy thông tin khóa học của tài khoản
                nguoiDungService.LayThongTinKhoaHoc(taiKhoan)
                    .done(function(result) {
                        //kiểm tra tài khoản có tồn tại các khóa học chưa?
                        //nếu tồn tại thì không thể xóa tài khoản
                        //Nếu k có khóa học nào được ghi danh thì sẽ xóa được.
                        if (result !== "") {
                            swal({
                                position: 'center',
                                type: 'warning',
                                title: 'Không Thể Xóa',
                                text: 'Tài khoản đã được ghi danh các khóa học',
                            })
                        } else {
                            nguoiDungService.XoaNguoiDung(taiKhoan)
                                .done(function(result) {
                                    swal({
                                        title: 'Bạn Đã Xóa Thành Công!',
                                        type: 'success',
                                        showConfirmButton: false
                                    })
                                    setTimeout(function() {
                                        window.location.reload();
                                    }, 3000);

                                })
                                .fail(function(err) {
                                    console.log(err);
                                })
                        }
                    })
                    .fail(function(err) {
                        console.log(err);
                    })
            }
        })
    })

    //Hàm xử lý gọi modal thêm người dùng

    $('.btn-ThemNguoiDung').click(function() {
        //Clear dữ liệu textbox.txtF
        $(".txtF").val("");
        //Tạo phần nội dung  cho modal
        var modalTitle = `<h1>Thêm Người Dùng</h1>`;
        $(".modal-title").html(modalTitle);
        var modalFooter = `
            <button id="btnThem" class="btn btn-success">Thêm Người Dùng </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $(".modal-footer").html(modalFooter);

        $('#btnPopupModal').trigger('click');
    })

    //Xu ly click them nguoi dung
    $('body').delegate("#btnThem", 'click', function() {
        ThemNguoiDung();
    })
    //Hàm xử lý tên loại người dùng
    function TenLoaiNguoiDung(maLoaiNguoiDung) {
        var tenLoaiNguoiDung = "";
        if (maLoaiNguoiDung === "HV") {
            tenLoaiNguoiDung = "Học viên";
        } else if (maLoaiNguoiDung === "GV") {
            tenLoaiNguoiDung = "Giáo vụ";
        }
        return tenLoaiNguoiDung;
    }

    // Hàm Thêm Người Dùng
    function ThemNguoiDung() {
        var taiKhoan = $('#TaiKhoan').val();
        var matKhau = $('#MatKhau').val();
        var hoTen = $('#HoTen').val();
        var email = $('#Email').val();
        var soDT = $('#SoDT').val();
        var maLoaiNguoiDung = $('#MaLoaiNguoiDung').val();

        var tenLoaiNguoiDung = TenLoaiNguoiDung(maLoaiNguoiDung);
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
        nguoiDungService.ThemNguoiDung(nguoiDung)
            .done(function(result) {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Đã Thêm Thành Công!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function() {
                    window.location.reload();
                }, 2000)

            })
            .fail(function(err) {
                console.log(err);
            })
    }

    //Hàm Xử lý đẩy thông tin người dùng lên modal
    $('body').delegate('.btnSua', 'click', function() {

        //Khóa tài khoản
        $('#TaiKhoan').attr('readonly', true);
        //Lấy ra tài khoản hiện đang đăng nhập
        var TK = LayStorage()[0].TaiKhoan;
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

        var trNguoiDung = $(this).closest('.thongTinNguoiDung');
        var taiKhoan = trNguoiDung.find('.TaiKhoan').html().trim();
        var matKhau = trNguoiDung.find('.MatKhau').html().trim();
        var hoTen = trNguoiDung.find('.HoTen').html().trim();
        var email = trNguoiDung.find('.Email').html().trim();
        var soDT = trNguoiDung.find('.SoDT').html().trim();
        var tenLoaiNguoiDung = trNguoiDung.find('.TenLoaiNguoiDung').html().trim();
        var maLoaiNguoiDung = "";
        if (tenLoaiNguoiDung === "Học viên") {
            maLoaiNguoiDung = "HV";
        } else if (tenLoaiNguoiDung === "Giáo vụ") {
            maLoaiNguoiDung = "GV";
        }
        //Kiểm tra TK đang đăng nhập có trùng với Tk được chỉnh sửa k? Nếu trùng disable thuộc tính tên loại người dùng.
        if (taiKhoan === TK) {
            $("#MaLoaiNguoiDung").attr('disabled', true);

        } else {
            $("#MaLoaiNguoiDung").attr('disabled', false);
        }
        //Gán nội dung
        $('#TaiKhoan').val(taiKhoan);
        $('#MatKhau').val(matKhau);
        $('#HoTen').val(hoTen);
        $('#Email').val(email);
        $('#SoDT').val(soDT);
        $('#MaLoaiNguoiDung').val(maLoaiNguoiDung);

    })

    //Hàm Cập nhật người dùng
    $('body').delegate("#btnLuu", 'click', function() {


        // gán giá trị
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        var maLoaiNguoiDung = $("#MaLoaiNguoiDung").val();
        var tenLoaiNguoiDung = TenLoaiNguoiDung(maLoaiNguoiDung);

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, TenLoaiNguoiDung);

        nguoiDungService.CapNhatNguoiDung(nguoiDung)
            .done(function(result) {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Đã Lưu Thành Công!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function() {
                    window.location.reload();
                }, 2000)
            })
            .fail(function(err) {
                console.log(err);
            })
    })
    //Xử Lý sự kiện tìm kiếm
    $("#txtTuKhoa").keyup(function() {

        var tuKhoa = $("#txtTuKhoa").val();
        //var tuKhoa = $(this).val();
        //Gọi phương thức tìm kiếm người dùng => trả là 1 danh sách người dùng chứa từ khóa
        var danhSachNguoiKQ = danhSachNguoiDung.TimKiemNguoiDung(tuKhoa);
        CardNguoiDung(danhSachNguoiKQ.DSND);

        // HighLight(tuKhoa);
    })

    //Xu ly click nut Ghi Danh
    $('body').delegate(".btnGhiDanh", 'click', function() {
        var taiKhoan = $(this).attr("data-TaiKhoan");
        var modalTitle = `<h1>Ghi Danh Khoa Hoc</h1>`;
        var modalBody = `
            <div class="form-group">
               <label>Danh sách Khóa Học</label>
                <select id="danhSachKhoaHoc" class="form-control">
                </select>
            </div>
        `
        var modalFooter = `
            <button id="btnGhiDanh" data-taikhoan = ${taiKhoan} class="btn btn-success">Ghi Danh </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng </button>
        `
        $('.modal-title').html(modalTitle);
        $('.modal-body').html(modalBody);
        $('.modal-footer').html(modalFooter);
        $('#btnPopupModal').trigger("click");
        LayThongTinKhoaHoc();

    })

    //Hàm lấy thông tin các khóa học
    function LayThongTinKhoaHoc() {
        khoaHocService.LayDanhSachKhoaHoc()
            .done(function(DSKH) {
                //Load danh sach khoa hoc len the Select
                var noidung = "";
                for (var i = 0; i < DSKH.length; i++) {
                    var khoaHoc = DSKH[i];
                    noidung +=
                        `
                    <option value = "${khoaHoc.MaKhoaHoc}">${khoaHoc.TenKhoaHoc}</option>
                `
                }
                $('#danhSachKhoaHoc').html(noidung);
            })
            .fail(function(err) {
                console.log(err);
            })
    }
    //Xử Lý click Ghi Danh Khoá Học
    $("body").delegate("#btnGhiDanh", "click", function() {
        var taiKhoan = $(this).attr("data-TaiKhoan");
        var maKhoaHoc = $("#danhSachKhoaHoc").val();
        var flag = 1;

        //Xử Lý kiểm tra khóa học đã được add vào chưa
        nguoiDungService.LayThongTinKhoaHoc(taiKhoan)
            .done(function(result) {
                for (var i = 0; i < result.length; i++) {
                    var khoaHoc = result[i];
                    if (khoaHoc.MaKhoaHoc === maKhoaHoc) {
                        flag = 0;
                        break;
                    }
                }
                console.log(flag);
                //Kiểm tra nếu flag = 0, khóa học đã tồn tại,
                // Nếu flag != 0, thực hiện ghi danh khóa học
                if (flag === 0) {
                    swal({
                        position: 'center',
                        type: 'warning',
                        title: 'Khóa Học Đã Tồn tại!!',
                        timer: 1500
                    })
                } else {
                    khoaHocService.GhiDanhKhoaHoc(maKhoaHoc, taiKhoan)
                        .done(function(result) {
                            swal({
                                position: 'center',
                                type: 'success',
                                title: 'Ghi Danh Thành Công!!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function() {
                                window.location.reload();
                            }, 2000)

                        })
                        .fail(function(err) {
                            console.log(err);
                        })
                }
            })
            .fail(function(err) {
                console.log(err);
            })
    })


    //Hàm lọc danh sách người dùng
    function LocDanhSachNguoiDung(MLND) {

    }


    // LocDanhSachNguoiDung('HV');
    //Xử lý Sự kiện onchange Lọc người dùng
    
    $('#locNguoiDung').change(function() {
        var MLND = $(this).val();
        var danhSachKQ = [];
        nguoiDungService.LayThongTinNguoiDung()
            .done(function(result) {
                danhSachNguoiDung.DSND = result;
                for (var i = 0; i < danhSachNguoiDung.DSND.length; i++) {
                    var nguoiDung = danhSachNguoiDung.DSND[i];
                    if (nguoiDung.MaLoaiNguoiDung === MLND) {
                        danhSachKQ.push(nguoiDung);
                    }
                }
                if (MLND === "HV" || MLND === "GV") {
                    CardNguoiDung(danhSachKQ);

                } else {
                    LoadDanhSachNguoiDung();
                }
            })
            .fail(function(err) {
                console.log(err);
            })
    })
});