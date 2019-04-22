
dl表结构:
autokey  自动增长
userid    录入人
username  录入人姓名
 
productno 工程单号
     
custno 客户编号
    
pono 订单编号

itemno --客户料号

itemsname --产品名称

poqty     --订单数量   INT 整型

--helppmcmans        del ***


    
helptimes --求助次数
    
helplasttime --最后求助时间 (一天只可以求助一次) 

csexpectdate     --cs期望交期  字符
    
pmsreplydate --pmc复期  字符

addpmcreplycomment --pmc 答复时填写备注

addpmcreplydate     --pmc答复时间
    
addpmcman         --pmc答复人
addpmcmanname     --pmc答复人姓名
    
comment --备注 CS求助备注

overdate        --完成时间 

helppmc1          -- 求助对象1  13925520750
helppmc2          -- 求助对象2  13925520750

helppmcname1      -- 求助对象1  名字
helppmcname2      -- 求助对象2  名字

 

users表结构:
autokey  自动增长
userid   用户id (手机号)
username 用户名 
pwd      密码


