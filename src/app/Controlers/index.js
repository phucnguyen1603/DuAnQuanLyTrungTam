// $('.btn-DangNhap').click(function() {
//     window.location.assign("Pages/admin.html");
// })
//Focus input100
$('.input100').each(function() {
    $(this).on('blur', function() {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        } else {
            $(this).removeClass('has-val');
        }
    })
})

// Hiển thị form login
$('.btn-DangNhap').click(function() {
    $('.bg-form').addClass('bg-form--display');
    $('.wrap-login100').addClass('wrap-login100--display');
})
$('.bg-form').click(function() {
    $(this).removeClass('bg-form--display');
    $('.wrap-login100').removeClass('wrap-login100--display');
})

$('.txtDangKy').click(function() {
        $('.wrap-login100').removeClass('wrap-login100--display');
        $('.wrap-signUp100').addClass('wrap-signUp100--display');
    })
    //Hiển thị form đăng kí

$('.btn-DangKy').click(function() {
    $('.bg-form').addClass('bg-form--display');
    $('.wrap-signUp100').addClass('wrap-signUp100--display');
})
$('.bg-form').click(function() {
    $(this).removeClass('bg-form--display');
    $('.wrap-signUp100').removeClass('wrap-signUp100--display');
})
$('.txtDangNhap').click(function() {
    $('.wrap-login100').addClass('wrap-login100--display');
    $('.wrap-signUp100').removeClass('wrap-signUp100--display');
})



// Khởi tạo obj danh sách người dùng
var danhSachNguoiDung = new DanhSachNguoiDung();
//Khởi tạo obj người dùng service
var nguoiDungService = new NguoiDungService();


//Hàm Xử lý Đăng nhập
function XuLyDangNhap() {


    // Lấy giá trị từ form nhập vào
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var flag = 1;


    nguoiDungService.LayThongTinNguoiDung()
        .done(function(result) {
            danhSachNguoiDung.DSND = result;
            //Duyet danh sach nguoi dung xem co tai khoan va` mat khau trung voi TK va MK nhap vao hay khong?
            for (var i = 0; i < danhSachNguoiDung.DSND.length; i++) {
                var nguoiDung = danhSachNguoiDung.DSND[i];
                if (taiKhoan === nguoiDung.TaiKhoan && matKhau === nguoiDung.MatKhau) {
                    // trả về 1 nếu tìm thấy
                    flag = 1;
                    break;
                } else {
                    // trả về không nếu nhập sai(không tìm thấy)
                    flag = 0;
                }
            }
            if (flag === 1) {
                nguoiDungService.DangNhap(taiKhoan, matKhau)
                    .done(function(result) {
                        var maLoaiNguoiDung = result[0].MaLoaiNguoiDung;
                        LuuStorage(result);
                        if (maLoaiNguoiDung === "GV") {
                            window.location.assign("../Views/Pages/admin.html");
                        } else {
                            window.location.assign("nguoiDung.html");
                        }
                    })
                    .fail(function(err) {
                        console.log(err);
                    })
            } else {
                swal({
                    type: 'error',
                    title: 'Tài khoản hoặc mật khẩu không đúng!',
                    text: 'Vui lòng nhập lại!!!',
                })
                console.log(showConfirmButton);
                // if(showConfirmButton) {

                // }
            }

        })
        .fail(function(err) {
            console.log(err);
        })
}


//Hàm Xử Lý Đăng Ký Người Dùng
function DangKiNguoiDung() {
    var taiKhoan = $('#TKDangKy').val();
    var matKhau = $('#MKDangKy').val();
    var hoTen = $('#HTDangKy').val();
    var email = $('#emailDangKy').val();
    var soDT = $('#SoDTDangKy').val();
    var maLoaiNguoiDung = 'HV';
    var tenLoaiNguoiDung = "Học viên";

    var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
    nguoiDungService.ThemNguoiDung(nguoiDung)
        .done(function(result) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Đăng Kí Thành Công',
                showConfirmButton: false,
            })
        })
        .fail(function(err) {
            console.log(err);
        })
    setTimeout(function() {
        window.location.reload();
    }, 2000)
}

$('#btn-DangNhap').click(function() {
    XuLyDangNhap();
});


$('#btn-DangKy').click(function() {
    DangKiNguoiDung();
})