{window.clearTimeout;if("guest")
call:"/ajax/replace-securitytoken"}
ReplaceSecurityToken = function (a) {
'undefined' != typeof a && '' != a && (b('form').each(function () {
var c = b(this);
if (this.action && !vBulletin.isInternalUrl(this.action)) return console.log('Skipping security token for external url (form action): ' + this.action),
!0;
'undefined' != typeof this.method && 'post' == this.method.toLowerCase() && (c.find('input[name="securitytoken"]').length ? c.find('input[name="securitytoken"]').val(a)  : c.append('<input type="hidden" name="securitytoken" value="' + a + '" />'))
}), pageData.securitytoken = a, console.log('Securitytoken updated'))
};
window.openAlertDialog = function (addEventListener) {
var c = b('#alert-dialog');
a = a || {
};
c.data('created') || c.dialog({
autoOpen: !1,
modal: !0,
resizable: !1,
closeOnEscape: !1,
showCloseButton: !1,
dialogClass: 'dialog-container alert-dialog-container dialog-box',
create: 
  function () {
        c.data('created', !0)
}
});
}
