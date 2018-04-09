const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAIsC0l8lA15nZW'
const secretAccessKey = 'ONm1Wcd9r3AjUnzyfTK3LnuhLHDJ4s'
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

module.exports = {
  sendCode(option){
    console.log(option)
    smsClient.sendSMS({
        PhoneNumbers: option.PhoneNumbers,
        SignName: '吴勋勋',//按照严格意义来说，此处的签名和模板的ID都是可变的
        TemplateCode: 'SMS_111785721',
        TemplateParam: '{"code":'+option.code+'}'
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            //处理返回参数
            console.log(res)
            option.success()
        }
    }, function (err) {
        console.log(err)
    })
  }
}