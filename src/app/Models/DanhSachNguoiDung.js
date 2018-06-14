function DanhSachNguoiDung()
{
    this.DSND = [];
    // Them nguoidung
    this.ThemNguoiDung = function(nguoiDung){
        this.DSND.push(nguoiDung);
    }
   
   
    //Phương thức tìm kiếm người dùng theo họ tên
    this.TimKiemNguoiDung = function(tuKhoa)
    {
        //Loại bỏ khoảng trống đầu cuối và chuyển thành chữ thường
        tuKhoa = tuKhoa.trim().toLowerCase();
        //Tạo đối tượng danhSachNguoiDungKetQua
        var danhSachNguoiDungKQ = new DanhSachNguoiDung();
        for(var i=0; i < this.DSND.length ; i++)
        {
            var nguoiDung = this.DSND[i];
            var timKiemHoTen = nguoiDung.HoTen.toLowerCase().trim().search(tuKhoa); 
            // var timKiemMatKhau = nguoiDung.MatKhau.toLowerCase().trim().search(tuKhoa); 
            // // var timKiemEmail = nguoiDung.Email.toLowerCase().trim().search(tuKhoa); 
            // var timKiemTaiKhoan = nguoiDung.TaiKhoan.toLowerCase().trim().search(tuKhoa);
            // var timKiemSoDT = nguoiDung.SoDT.search(tuKhoa);



            if(timKiemHoTen !== -1 )
            {
                danhSachNguoiDungKQ.ThemNguoiDung(nguoiDung);
            }
        }
        return danhSachNguoiDungKQ;
    }
    //Phương thức tìm người dùng theo tài khoản
    this.TimNguoiDungTheoTaiKhoan = function (TaiKhoan)
    {
        for(var i = 0; i< this.DSND.length ; i++)
        {
            
            var nguoiDung = this.DSND[i];
            //So sánh người dùng trong mảng và taikhoan thì trả ra giá trị index
            if(nguoiDung.TaiKhoan === TaiKhoan)
            {
                return i;
            }
        }
        return -1;
    }
}