
autokey  自动增长
userid    录入人
username  录入人姓名
 
productno 工程单号
     
custno 客户编号
    
pono 订单编号

itemno --客户料号

itemsname --产品名称

poqty     --订单数量   INT 整型

helppmcmans -- 求助对象  数组
    
helptimes --求助次数
    
helplasttime --最后求助时间 (一天只可以求助一次)

csexpectdate     --cs期望交期  字符
    
pmsreplydate --pmc复期  字符

addpmcreplycomment --pmc 答复时填写备注

addpmcreplydate     --pmc答复时间
    
addpmcman         --pmc答复人
addpmcmanname     --pmc答复人姓名
	
    
comment --备注 CS求助备注
 




















--新建一个表记录操作日志
CREATE TABLE helpme_dllog
(
    autokey INT IDENTITY CONSTRAINT pk_helpme_dllog PRIMARY KEY ,
    [CompanyId] VARCHAR(20) ,
    -- add添加记录 update添加记录  reply答复  againhelp 再次求助
    runtype NVARCHAR(16) ,

    --状态
    status VARCHAR(10) DEFAULT ( 'N' ) ,

    --批核人
    confirmid VARCHAR(20) ,

    --批核日期
    confirmdate DATETIME ,

    --录入人
    userid VARCHAR(20) ,

    --录入日期
    inputdate DATETIME ,

    --修改人
    modifyid VARCHAR(20) ,

    --修改日期
    modifydate DATETIME ,

    -- 删除标志
    delflag VARCHAR(20) ,

    --工程单号
    productno VARCHAR(88) ,
    -- 客户编号
    custno VARCHAR(88) ,
    helppmcmans VARCHAR(1280) ,
    helpnoworkmans VARCHAR(1280) ,

    ----cs期望交期/或者pmc的复期
    csexpectdate DATETIME NULL ,

    --把当时的备注copy过来
    [comment] [VARCHAR](720)
)

CREATE INDEX index_helpme_dllog
    ON helpme_dllog ( CompanyId, productno, runtype, inputdate )


--当时的未完成工序代号,多个逗号分隔
ALTER TABLE helpme_dllog
ADD noworkprocessno VARCHAR(3600)

--当时的未完成工序名称,多个逗号分隔
ALTER TABLE helpme_dllog
ADD noworkprocessdesc VARCHAR(3600)


--程序编号  PC WX
ALTER TABLE helpme_dllog 
ADD ProgramNO     VARCHAR(20) DEFAULT('PC')

 

-- 备用1
ALTER TABLE helpme_dllog 
ADD Col1     VARCHAR(720) DEFAULT('')

-- 备用2
ALTER TABLE helpme_dllog 
ADD Col2     VARCHAR(720) DEFAULT('')

-- 备用3
ALTER TABLE helpme_dllog 
ADD Col3     VARCHAR(720) DEFAULT('')


