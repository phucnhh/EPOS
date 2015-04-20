angular.module('epos')
/*constants config of system*/
.constant('cfg', {
  erphost: 'localhost',
  erpport: 8069,
  erpdb: 'ema'
})
/*msg for error code*/
.constant('msg', {
  errAnm: 'Có lỗi xảy ra vui lòng khởi động lại máy tính và liên hệ với nhà cung cấp để được hỗ trợ',	
  err500: 'Không thể kết nối tới máy chủ',
  err300: 'Sai tên đăng nhập hoặc mật khẩu'
})