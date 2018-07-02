var danhSachNguoiDung = new DanhSachNguoiDung();
var nguoiDungService = new NguoiDungService();

var khoaHocService = new KhoaHocService();
var danhSachKhoaHoc = new DanhSachKhoaHoc();
//Xử lý sự kiện click log out
$('#logout').click(function() {
    window.localStorage.clear();
})

function LuuStorage(DSND) {
    //Lưu mảng người dùng
    var jsonDSND = JSON.stringify(DSND);
    localStorage.setItem("DanhSachNguoiDung", jsonDSND);
}
//Hàm Lấy dữ liệu từ local Storage
function LayStorage() {
    //Lấy dữ liệu từ localstorage
    var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
    danhSachNguoiDung.DSND = JSON.parse(jsonDSND);

    // var ten = danhSachNguoiDung.DSND[0].HoTen;
    // $(".HienThiHoTen").html(ten);
    return danhSachNguoiDung.DSND;
}

function HienThiHoTen() {
    nguoiDungService.LayThongTinNguoiDung()
        .done(function(result) {
            var taiKhoan = LayStorage()[0].TaiKhoan;
            for (var i = 0; i < result.length; i++) {
                var nguoiDung = result[i];
                if (taiKhoan === nguoiDung.TaiKhoan) {
                    danhSachNguoiDung.DSND = nguoiDung
                    break;
                }
            }
            $(".HienThiHoTen").html(danhSachNguoiDung.DSND.HoTen);
        })
        .fail(function(err) {
            console.log(err);
        })
}
HienThiHoTen();

// Xử lý kiểm tra loại người dùng


// lấy mã loại người dùng

var MLND = LayStorage()[0].MaLoaiNguoiDung;
//Kiểm tra nếu MLND === GV thì thêm class hiển thị menu quản lý
if (MLND === "GV") {
    $('.admin').addClass('admin-block');
} else if (MLND === "HV") {
    $('.admin').removeClass('admin-block');
}