function validateShiftTime(t1, t2, t3, t4) {
//t1,t2 已经存在的班次时间，t3,t4新增班次时间
    var checkinTime = new Date("January 01,2015 " + t1);
    var checkoutTime = new Date("January 01,2015 " + t2);
    if (checkoutTime.getTime() < checkinTime.getTime()) {
        checkoutTime.setDate(checkoutTime.getDate() + 1);
    }
    var attCheckinTime = new Date("January 01,2015 " + t3);
    var attCheckoutTime = new Date("January 01,2015 " + t4);
    if (attCheckoutTime.getTime() < attCheckinTime.getTime()) {
        attCheckoutTime.setDate(attCheckoutTime.getDate() + 1);
    }
    if (checkoutTime.getTime() > attCheckinTime.getTime() && 
    checkoutTime.getTime() <= attCheckoutTime.getTime()) {
        return false;
    }

    if (checkinTime.getTime() >= attCheckinTime.getTime() && 
    checkinTime.getTime() < attCheckoutTime.getTime()) {
        return false;
    }

    if (checkinTime.getTime() <= attCheckinTime.getTime() && 
    checkoutTime.getTime() >= attCheckoutTime.getTime()) {
        return false;
    }
    return true;
}
$(function() {
    $('[data-rel=tooltip]').tooltip();
})