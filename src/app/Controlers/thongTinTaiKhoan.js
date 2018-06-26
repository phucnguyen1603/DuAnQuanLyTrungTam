$(function() {

    nguoiDungService.LayThongTinNguoiDung()
        .done(function(result) {
            var taiKhoan = LayStorage()[0].TaiKhoan;
            for (var i = 0; i < result.length; i++) {
                var nguoiDung = result[i];
                if (taiKhoan === nguoiDung.TaiKhoan) {
                    danhSachNguoiDung.DSND = nguoiDung;
                    break;
                }
            }
            console.log(danhSachNguoiDung.DSND);
            var nguoiDungHienTai = danhSachNguoiDung.DSND;
            var TK = nguoiDungHienTai.TaiKhoan;
            var matKhau = nguoiDungHienTai.MatKhau;
            var hoTen = nguoiDungHienTai.HoTen;
            var soDT = nguoiDungHienTai.SoDT;
            var email = nguoiDungHienTai.Email;
            var MLND = nguoiDungHienTai.MaLoaiNguoiDung;

            $('#TaiKhoan').val(TK);
            $('#MatKhau').val(matKhau);
            $('#HoTen').val(hoTen);
            $('#Email').val(email);
            $('#SoDT').val(soDT);
        })
        .fail(function(err) {
            console.log(err);
        })


    function CapNhatNguoiDung() {
        var taiKhoan = $('#TaiKhoan').val();
        var matKhau = $('#MatKhau').val();
        var email = $('#Email').val();
        var hoTen = $('#HoTen').val();
        var soDT = $('#SoDT').val();
        var MLND = LayStorage()[0].MaLoaiNguoiDung;
        var tenLoaiNguoiDung = LayStorage()[0].TenLoaiNguoiDung;

        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, MLND, tenLoaiNguoiDung);
        nguoiDungService.CapNhatNguoiDung(nguoiDung)
            .done(function(result) {
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Cập Nhật Thành Công',
                    showConfirmButton: false
                })
                setTimeout(function() {
                    window.location.reload()
                }, 2000)

            })
            .fail(function(err) {
                console.log(err);
            })

    }
    $('.btn-CapNhat').click(function() {
        CapNhatNguoiDung();
    })

})