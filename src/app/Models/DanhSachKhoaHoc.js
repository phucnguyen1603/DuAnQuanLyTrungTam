function DanhSachKhoaHoc() {
	this.DSKH = [];

	// Them nguoidung
    this.ThemKhoaHoc = function(khoaHoc){
        this.DSKH.push(khoaHoc);
    }
    //Phương thức tìm kiếm người dùng theo tên khóa học
    this.TimKiemKhoaHoc = function(tuKhoa)
    {
        //Loại bỏ khoảng trống đầu cuối và chuyển thành chữ thường
        tuKhoa = tuKhoa.trim().toLowerCase();
        //Tạo đối tượng danhSachNguoiDungKetQua
        var danhSachTimKiem = new DanhSachKhoaHoc();
        for(var i=0; i < this.DSKH.length ; i++)
        {
            var khoaHoc = this.DSKH[i];
            var timKiem = khoaHoc.TenKhoaHoc.toLowerCase().trim().search(tuKhoa); 

            if(timKiem !== -1 )
            {
                danhSachTimKiem.ThemKhoaHoc(khoaHoc);
            }
        }
        return danhSachTimKiem;
    }
}