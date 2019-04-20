
autokey  �Զ�����
userid    ¼����
username  ¼��������
 
productno ���̵���
     
custno �ͻ����
    
pono �������

itemno --�ͻ��Ϻ�

itemsname --��Ʒ����

poqty     --��������   INT ����

helppmcmans -- ��������  ����
    
helptimes --��������
    
helplasttime --�������ʱ�� (һ��ֻ��������һ��)

csexpectdate     --cs��������  �ַ�
    
pmsreplydate --pmc����  �ַ�

addpmcreplycomment --pmc ��ʱ��д��ע

addpmcreplydate     --pmc��ʱ��
    
addpmcman         --pmc����
addpmcmanname     --pmc��������
	
    
comment --��ע CS������ע
 




















--�½�һ�����¼������־
CREATE TABLE helpme_dllog
(
    autokey INT IDENTITY CONSTRAINT pk_helpme_dllog PRIMARY KEY ,
    [CompanyId] VARCHAR(20) ,
    -- add��Ӽ�¼ update��Ӽ�¼  reply��  againhelp �ٴ�����
    runtype NVARCHAR(16) ,

    --״̬
    status VARCHAR(10) DEFAULT ( 'N' ) ,

    --������
    confirmid VARCHAR(20) ,

    --��������
    confirmdate DATETIME ,

    --¼����
    userid VARCHAR(20) ,

    --¼������
    inputdate DATETIME ,

    --�޸���
    modifyid VARCHAR(20) ,

    --�޸�����
    modifydate DATETIME ,

    -- ɾ����־
    delflag VARCHAR(20) ,

    --���̵���
    productno VARCHAR(88) ,
    -- �ͻ����
    custno VARCHAR(88) ,
    helppmcmans VARCHAR(1280) ,
    helpnoworkmans VARCHAR(1280) ,

    ----cs��������/����pmc�ĸ���
    csexpectdate DATETIME NULL ,

    --�ѵ�ʱ�ı�עcopy����
    [comment] [VARCHAR](720)
)

CREATE INDEX index_helpme_dllog
    ON helpme_dllog ( CompanyId, productno, runtype, inputdate )


--��ʱ��δ��ɹ������,������ŷָ�
ALTER TABLE helpme_dllog
ADD noworkprocessno VARCHAR(3600)

--��ʱ��δ��ɹ�������,������ŷָ�
ALTER TABLE helpme_dllog
ADD noworkprocessdesc VARCHAR(3600)


--������  PC WX
ALTER TABLE helpme_dllog 
ADD ProgramNO     VARCHAR(20) DEFAULT('PC')

 

-- ����1
ALTER TABLE helpme_dllog 
ADD Col1     VARCHAR(720) DEFAULT('')

-- ����2
ALTER TABLE helpme_dllog 
ADD Col2     VARCHAR(720) DEFAULT('')

-- ����3
ALTER TABLE helpme_dllog 
ADD Col3     VARCHAR(720) DEFAULT('')


