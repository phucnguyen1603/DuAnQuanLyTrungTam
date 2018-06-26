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
        var danhSachTimKiem = new DanhSachNguoiDung();
        for(var i=0; i < this.DSND.length ; i++)
        {
            var nguoiDung = this.DSND[i];
            var timKiem = nguoiDung.HoTen.toLowerCase().trim().search(tuKhoa); 

            if(timKiem !== -1 )
            {
                danhSachTimKiem.ThemNguoiDung(nguoiDung);
            }
        }
        return danhSachTimKiem;
    }
}