var http_request=false;

//��ʼ����ָ������������������ĺ���
function send_request(url){
     http_request=false;
     //��ʼ��ʼ��XMLHttpRequest����
     if(window.XMLHttpRequest){          //Mozilla�����
          http_request=new XMLHttpRequest();
          if(http_request.overrideMimeType){          //����MIME���
               http_request.overrideMimeType("text/xml");
          }
     }else if(window.ActiveXObject){               //IE�����
            try{
                 http_request=new ActiveXObject("Msxml2.XMLHttp");
            }catch(e){
                  try{
                       http_request=new ActiveXobject("Microsoft.XMLHttp");
                  }catch(e){}
            }
     }
     if(!http_request){          //�쳣����������ʵ��ʧ��
            window.alert("����XMLHttp����ʧ��!");
            return false;
     }
     http_request.onreadystatechange = processrequest;
     //ȷ����������ʽ��URL�����Ƿ�ͬ��ִ���¶δ���
    http_request.open("GET",url,true);
     http_request.send(null);
    
}

//��������Ϣ�ĺ���
function processrequest(){
     if(http_request.readyState==4 && http_request.status==200){         
          var jsonObj = JSON.parse(http_request.responseText);
          if(jsonObj.name_used == 1)
               document.getElementById("usernameexist").value=1;
          else
               document.getElementById("usernameexist").value=0;
     }
}

/*
//��������Ϣ�ĺ���
function processrequest(){
     if(http_request.readyState==4){          //�ж϶���״̬
          if(http_request.status==200){    
          //��Ϣ�ѳɹ����أ���ʼ������Ϣ
             var stringArray = http_request.responseText.split("||");
              document.getElementById(reobj).innerHTML=stringArray[0];
             if(http_request.responseText.indexOf("font_green12")==-1){
                   
                      if(stringArray[1]==1){
                         document.getElementById("usernameexist").value=1;
                      }
                      if(stringArray[1]==2){
                         document.getElementById("emailexist").value=1;
                      }
                      if(stringArray[1]==3){
                         document.getElementById("yumingexist").value=1;
                      }
                      if(stringArray[1]==4){
                         document.getElementById("yanzhengexsit").value=1;
                      }
                      if(stringArray[1]==5){
                         document.getElementById("nowpassok").value=1;
                      }
             }else{
                 
                    if(stringArray[1]==1){
                         document.getElementById("usernameexist").value=0;
                      }
                      if(stringArray[1]==2){
                         document.getElementById("emailexist").value=0;
                      }
                      if(stringArray[1]==3){
                         document.getElementById("yumingexist").value=0;
                      }
                      if(stringArray[1]==4){
                         document.getElementById("yanzhengexsit").value=0;
                      }
                      if(stringArray[1]==5){
                         document.getElementById("nowpassok").value=0;
                      }
               }
              
            }
     }
}
*/

//�����ַ�����
function checkStrLen(string){
     var str,Num = 0;
     for(var i=0;i<string.length;i++){
          str = string.substring(i,i+1);
          if(str<="~"){  //�ж��Ƿ�˫�ֽ�
                  Num+=1;
          }else{
                  Num+=3;
          }
     }
     return Num;
}

//��֤username
function usercheck(obj){
     var userAgent = navigator.userAgent.toLowerCase();
    var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
    var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
    var isie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
     var is_ie=0;
     if(isie) is_ie=1;
     var uservalue=document.getElementById("usrname").value;
    
    
     var userlen=checkStrLen(uservalue);
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
     var userformat=/^(\w|[\u4E00-\u9FA5])+$/
     if(uservalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>�û�������Ϊ�ա�</span>";
          /*f.username.focus();*/
          return false;
     }else if(userlen<4){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�û�������С��4���ַ���</span>";
            
             return false;
     }else if(userlen>15){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�û������ܴ���15���ַ���</span>";
            
             return false;
     }else if(!userformat.test(uservalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�û�������ʹ�������ַ���</span>";
            
             return false;
     }else if(pattern.test(uservalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�û������������ַ���ϵͳ���Ρ�</span>";
            
             return false;
     }else{
          document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj=obj;
         
          send_request('checkuser.php?usrname='+uservalue+"&is_ie="+is_ie);
         
     }
}

//��֤blogname
function blognamecheck(obj){
    
     var blognamevalue=document.getElementById("blogname").value;
     var uidvalue=document.getElementById("uid").value;
     var blognamelen=checkStrLen(blognamevalue);
     var patrn=/^[a-z0-9]{5,15}$/;
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
    
     if(blognamevalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>������������Ϊ�ա�</span>";
         
          return false;
     }else if(blognamelen<5){
             document.getElementById(obj).innerHTML="<span class='font_red12'>������������С��5���ַ�!</span>";
            
             return false;
     }else if(blognamelen>15){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����������ܴ���15���ַ���</span>";
            
             return false;
     }else if(!patrn.test(blognamevalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>��������Ӧ����5-15���ַ�����Сд��ĸ/���֡�</span>";
            
             return false;
     }else if(pattern.exec(blognamevalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����������������ַ���ϵͳ���Ρ�</span>";
            
             return false;
     }else{
          document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj=obj;
          send_request('checkblogname.php?blogname='+blognamevalue+'&uid='+uidvalue);
         
     }
}

//��֤numsone
function numsonecheck(obj){

     var numsonevalue=document.getElementById("numsone").value;
    
    
     if(numsonevalue>30 || numsonevalue<1){
          document.getElementById(obj).innerHTML="<span class='font_red12'>������ʾ����Ӧ��д1��30֮������֡�</span>";
          /*f.username.focus();*/
          return false;
     }else{
          document.getElementById(obj).innerHTML="<span class='font_green12'>������ʾ������д��ȷ��</span>";
     }
}

//��֤numsone
function numszerocheck(obj){
    
     var numszerovalue=document.getElementById("numszero").value;
     if(numszerovalue>25 || numszerovalue<1){
          document.getElementById(obj).innerHTML="<span class='font_red12'>������ʾ����Ӧ��д1��25֮������֡�</span>";
          /*f.username.focus();*/
          return false;
     }else{
          document.getElementById(obj).innerHTML="<span class='font_green12'>������ʾ������д��ȷ��</span>";
     }
}

//��֤blogtitle
function blogtitlecheck(obj){
    
     var blogtitle=document.getElementById("blogtitle").value;
     var titlelen=checkStrLen(blogtitle);
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
     var userformat=/^.*[\~\!\#\$\%\^\&\*\(\)\+\=\`\{\}\[\]\:\"\|\;\'\\\<\>\?\,\.\/\x20].*$/
     if(blogtitle==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>���ͱ��ⲻ��Ϊ�ա�</span>";
          /*f.username.focus();*/
          return false;
     }else if(titlelen<1){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���ͱ��ⲻ��С��1���ַ���</span>";
            
             return false;
     }else if(titlelen>24){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���ͱ��ⲻ�ܴ���24���ַ���</span>";
            
             return false;
     }else if(userformat.test(blogtitle)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���ͱ��ⲻ��ʹ�������ַ���</span>";
            
             return false;
     }else if(pattern.test(blogtitle)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���ͱ�����������ַ���ϵͳ���Ρ�</span>";
            
             return false;
     }else{
          document.getElementById(obj).innerHTML="<span class='font_green12'>���ͱ�����д��ȷ��</span>";
     }
}

//��֤blogname2
function blognamechecktwo(obj){
    
     var blognamevalue=document.getElementById("blogname").value;
     var uidvalue=document.getElementById("uid").value;
     var blognamelen=checkStrLen(blognamevalue);
     var patrn=/^[a-z0-9]{5,15}$/;
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
    
     if(blognamevalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>������������Ϊ�ա�</span>";
         
          return false;
     }else if(blognamelen<5){
             document.getElementById(obj).innerHTML="<span class='font_red12'>������������С��5���ַ�!</span>";
             return false;
     }else if(blognamelen>15){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����������ܴ���15���ַ���</span>";
            
             return false;
     }else if(!patrn.test(blognamevalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>��������Ӧ����5-15���ַ�����Сд��ĸ/���֡�</span>";
            
             return false;
     }else if(pattern.exec(blognamevalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����������������ַ���ϵͳ���Ρ�</span>";
            
             return false;
     }else{
          document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj=obj;
          send_request('checkblogname.php?blogname='+blognamevalue+'&uid='+uidvalue);
         
     }
}


//��֤password
function pwdcheck(obj){
    
     var pwdvalue=document.getElementById("userpwd").value;
     if(pwdvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>���벻��Ϊ�ա�</span>";
             /*f.userpwd.focus();*/
             return false;
     }else if(pwdvalue.length<6){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���볤�Ȳ���С��6���ַ���</span>";
            
             return false;
     }else if(pwdvalue.length>20){
             document.getElementById(obj).innerHTML="<span class='font_red12'>���볤�Ȳ��ܴ���20���ַ���</span>";
             //f.userpwd.focus();
             return false;
     }else{
             document.getElementById(obj).innerHTML="<span class='font_green12'>������д��ȷ��Ϊ�������˺Ű�ȫ��ǿ�ҽ�����ʹ�ð�ȫǿ�ȸߵ����룺8-20���ַ����������֡���Сд��ĸ�����ţ����Ҿ���û�й��ɡ�</span>";
     }
}

//��֤password
function chk1(obj,uid){
    
     var pwdvalue=document.getElementById("nowpwd").value;
     if(pwdvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>���벻��Ϊ�ա�</span>";
             /*f.userpwd.focus();*/
             return false;
     }else if(pwdvalue.length<6 || pwdvalue.length>20){
             document.getElementById(obj).innerHTML="<span class='font_red12'>ԭ���볤��Ӧ��Ϊ6-20���ַ�����</span>";
            
             return false;
     }else{
             document.getElementById(obj).innerHTML="������֤ԭ����...";
          reobj=obj;
          send_request('checkpass.php?pass='+pwdvalue+'&uid='+uid);

     }
}

//��֤password
function chk2(obj){
    
     var pwdvalue=document.getElementById("password").value;
     if(pwdvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>�����벻��Ϊ�ա�</span>";
             /*f.userpwd.focus();*/
             return false;
     }else if(pwdvalue.length<6 || pwdvalue.length>20){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����볤��Ӧ��Ϊ6-20���ַ�����</span>";
            
             return false;
     }else{
             document.getElementById(obj).innerHTML="<span class='font_green12'>������������ȷ��</span>";
     }
}

//��֤password
function chk3(obj){
    
     var pwdvalue=document.getElementById("password2").value;
     if(pwdvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>��������һ�������롣</span>";
             /*f.userpwd.focus();*/
             return false;
     }else if(document.getElementById("password").value!=document.getElementById("password2").value){
             document.getElementById(obj).innerHTML="<span class='font_red12'>��������������벻ͬ��</span>";
             return false;
     }else{
             document.getElementById(obj).innerHTML="<span class='font_green12'>������������ȷ��</span>";
     }
}

//��֤password2
function pwdrecheck(obj){
    
     var repwd=document.getElementById("password2").value;
     if(repwd==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>��������һ�����롣</span>";
          /*f.password2.focus();*/
          return false;
     }else if(document.getElementById("userpwd").value!=document.getElementById("password2").value){
          document.getElementById(obj).innerHTML="<span class='font_red12'>������������벻ͬ��</span>";
          //f.password2.focus();
          return false;
     }else{
             document.getElementById(obj).innerHTML="<span class='font_green12'>����������ȷ��</span>";
     }
}

//��֤email
function mailcheck(obj){
    
     var mailvalue=document.getElementById("email").value;
     var pamail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
     if(mailvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>���䲻��Ϊ�ա�</span>";
             /*f.email.focus();*/
             return false;
     }else if(!pamail.test(mailvalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>����д��Ч����</span>";
             //f.email.focus();
             return false;
     }else{
             document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj=obj;
          send_request('checkemails.php?email='+mailvalue);
         
     }
}

//��֤email
function mailchecktwo(obj){
    
     var mailvalue=document.getElementById("email").value;
     var oldmailvalue=document.getElementById("oldemail").value;
     var pamail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
     if(mailvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>���䲻��Ϊ�ա�</span>";
             /*f.email.focus();*/
             return false;
     }else if(!pamail.test(mailvalue)){
             document.getElementById(obj).innerHTML="<span class='font_red12'>����д��Ч���䡣</span>";
             //f.email.focus();
             return false;
     }else if(oldmailvalue==mailvalue){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�����䲻����ԭ����һ�¡�</span>";
             //f.email.focus();
             return false;
     }else{
             document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj=obj;
          send_request('checkemails.php?email='+mailvalue);
         
     }
}

function ckabout(obj){
    
     var aboutvalue=f.about.value;
             document.getElementById(obj).innerHTML="";
          send_request('checkiframe.php?about='+aboutvalue);
          reobj=obj;
}



//��֤blogname
function blogcheck(obj){
    
     var blogvalue=document.getElementById("blogname").value;
     var bloglen=checkStrLen(blogvalue);
     if(blogvalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>�����벩�����ơ�</span>";
             /*f.blogname.focus();*/
             return false;
     }else if(bloglen>50){
             document.getElementById(obj).innerHTML="<span class='font_red12'>�������Ʋ��ܳ���50�ַ���</span>";
             //f.blogname.focus();
             return false;
     }else{
             document.getElementById(obj).innerHTML="<span class='font_green12'>����������д��ȷ��</span>";
     }
}

//��֤full_name
function fnamecheck(obj){
    
     var fnavalue=document.getElementById("full_name").value;
     var fnalen=checkStrLen(fnavalue);
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
     if(fnalen>16){
             document.getElementById(obj).innerHTML="<span class='font_3'>�������ܳ���50�ַ�!</span>";
             //f.full_name.focus();
             return false;
     }else if(pattern.exec(fnavalue)){
             document.getElementById(obj).innerHTML="<span class='font_3'>�������������ַ�!</span>";
             f.full_name.focus();
             return false;
     }else{
             document.getElementById(obj).innerHTML="";
     }
}

//��֤��֤��
function codecheck(obj){
    
     var codevalue = document.getElementById("code").value;
     if(codevalue==""){
          document.getElementById(obj).innerHTML="<span class='font_red12'>��������֤��!</span>";
             /*f.email.focus();*/
             return false;
     }else{
             document.getElementById(obj).innerHTML="���ڶ�ȡ����...";
          reobj = obj;
          //codevalue = base64encode(utf8ToUnicode(codevalue));
          send_request('checkyanzheng.php?code='+codevalue);
     }
}





function check_data(){
     var userformat=/^(\w|[\u4E00-\u9FA5])+$/
     var emailformat=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
     var nostr="51cto|51ct0|root|���|ɵ��|����|admin|����|bbs|blog|group";
     var pattern = new RegExp(nostr,"gi");
    
     var username = document.getElementById('username');
     var email = document.getElementById('email');
     var passwd = document.getElementById('passwd');
     var passwd2 = document.getElementById('passwd2');
    
     if(document.getElementById('agree2').checked==true){
        alert("��ѡ��ͬ�⡶51CTO���������");
        document.getElementById('agree1').focus();
        return false;
     }
    
     //username
     if(username.value==""){
        alert("�û�������Ϊ�ա�");
             username.focus();
          username.value = "0";
          return false;
    } else if(checkStrLen(username.value)>15 || checkStrLen(username.value)<4){
        alert("�û�������д4-15���ַ����ȵ�����/��ĸ/���֣�ͬʱ����ʹ�������ַ���");
             username.focus();
          username.value = "0";
          return false;
    } else if(!userformat.test(username.value)){
        alert("�û�������ʹ�������ַ���");
        username.focus();    
        username.value = "0";
        return false;
     } else if(pattern.test(username.value)){
        alert("�û������������ַ���ϵͳ���Ρ�");
        username.focus();    
        return false;
     } else if(document.getElementById('usernameexist').value==1){
        alert("���û����Ѿ���ע��,�������");
        username.focus();    
        return false;
     } else {
          document.getElementById('checkname').value = "1";
     }
    
     //email
     if(document.getElementById('email').value==""){
        alert("���䲻��Ϊ�ա�");
        document.getElementById('email').focus();
        document.getElementById('checkemail').value = "1";
        return false;
     } else if(!emailformat.test(document.getElementById('email').value)){
        alert("����д��Ч���䣬��ȷ�����һ����롣");
        document.getElementById('email').focus();    
        document.getElementById('checkemail').value = "1";
        return false;
     } else if(document.getElementById('emailexist').value==1){
        alert("�������Ѿ���ע��,�������");
        document.getElementById('email').focus();    
        document.getElementById('checkemail').value = "1";
        return false;
     } else {
          document.getElementById('checkemail').value = "0";
     }
    
     //pwd
     if(document.getElementById('userpwd').value==""){
        alert("���벻��Ϊ�ա�");
             document.getElementById('userpwd').focus();
          document.getElementById('checkpwd').value = "0";
          return false;
    } else if(checkStrLen(document.getElementById('userpwd').value)>20 || checkStrLen(document.getElementById('userpwd').value)<6){
        alert("���볤��Ӧ��Ϊ6-20���ַ���");
             document.getElementById('userpwd').focus();
          document.getElementById('checkpwd').value = "0";
          return false;
    } else if(document.getElementById('userpwd').value!=document.getElementById('password2').value){
        alert("������������벻ͬ��");
             document.getElementById('userpwd').focus();
          document.getElementById('checkpwd').value = "0";
          return false;
    } else {
          document.getElementById('checkpwd').value = "1";
     }
    
    if(document.getElementById('guanzhu_hid').value==""  && document.getElementById('guanzhu_hid_other').value==""){
        alert("��ѡ��������ע����");
            
          return false;
    }
    
     if(document.getElementById('hangye_hid').value=="" && document.getElementById('hangye_hid_other').value==""){
        alert("��ѡ����������ҵ��");
          return false;
    }
    
     if(document.getElementById('zhiwei_hid').value=="" && document.getElementById('zhiwei_hid_other').value==""){
        alert("��ѡ������ְλ��");
          return false;
    }
    
     if(document.getElementById('companysize').value==""){
        alert("��ѡ�������ڹ�˾��ģ��");
          return false;
    }
     if(jQuery('input[name=city]:selected').val()==""){
          alert('��ѡ�������ڵĳ��С�');
     }
    
     if(document.getElementById('code').value==""){
       alert("��֤�벻��Ϊ�ա�");
       document.getElementById('code').focus();    
        return false;
    }
    
     return true;
}

