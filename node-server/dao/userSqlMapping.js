/**
 * Created by G on 2016/12/13.
 */

var user = {
    insert: 'insert into MirecoUser(bucket,phone,password) values(?,?,?)',
    update: 'update MirecoUser set password=? where phone=?',
    delete: 'delete from MirecoUser where phone = ?',
    queryByPhone: 'select * from MirecoUser where phone = ?',
    queryAll: 'select * from MirecoUser'
}

module.exports = user;
