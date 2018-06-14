var danhSachNguoiDung = new DanhSachNguoiDung();
var nguoiDungService = new NguoiDungService();

var khoaHocService = new KhoaHocService();
var danhSachKhoaHoc = new DanhSachKhoaHoc();
//Xử lý sự kiện click log out
$('#logout').click(function() {
    window.localStorage.clear();
})
//Hàm Lấy dữ liệu từ local Storage
function LayStorage() {
    //Lấy dữ liệu từ localstorage
    var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
    danhSachNguoiDung.DSND = JSON.parse(jsonDSND);

    // var ten = danhSachNguoiDung.DSND[0].HoTen;
    // $(".HienThiHoTen").html(ten);
    return danhSachNguoiDung.DSND;
}

// console.log(LayStorage()[0].HoTen);
var ten = LayStorage()[0].HoTen;
$(".HienThiHoTen").html(ten);