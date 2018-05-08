        //上传图片并预览
        function previewImg(fileInput,imgDiv,w,h){
            if(window.FileReader){//支持FileReader的时候
                var reader=new FileReader();
                reader.readAsDataURL(fileInput.files[0]);
                var img = new Image(); 
                reader.onload=function(evt){
                    img.src = evt.target.result;
                    // 定时执行获取宽高..暂时注释掉，这种方法能更快的获取img的信息
                    /*var start_time = new Date().getTime();
                    var check = function(){
                     // 只要任何一方大于0
                     // 表示已经服务器已经返回宽高
                     if(img.width>0 || img.height>0){
                        alert("time:"+(new Date().getTime()-start_time));
                        alert(img.width);
                        alert(img.height);
                        clearInterval(set);
                     }
                    };
                    var set = setInterval(check,40);*/
                    img.onload = function(){
                        if(img.width !=w || img.height!=h){
                            alert("图片必须为" + w + "*" + h + "");
                            img.src = "";
                            fileInput.value="";
                        }else{
                            imgDiv.innerHTML="\<img src="+evt.target.result+"\>";
                        }
                    }
                    
                }
            }else{//兼容ie9-
                imgDiv.innerHTML='<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + fileInput.value + '\)\';"></div>';
            }
        }
        
        function selectImg(fileInputs,imgDivs,index){

            var checkImg=new RegExp("(.jpg$)|(.png$)|(.bmp$)|(.jpeg$)","i");
            var i=0;
            for(;i<fileInputs.length&&i<imgDivs.length;i++){
                (function(i){//立即执行函数；保存i
                    fileInputs[i].onchange=function(){
                        if(checkImg.test(fileInputs[i].value)&&index==1){
                            previewImg(this,imgDivs[i],168,168);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==2){
                            previewImg(this,imgDivs[i],750,450);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==3){
                            previewImg(this,imgDivs[i],750,400);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==4){
                            previewImg(this,imgDivs[i],100,100);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==5){
                            previewImg(this,imgDivs[i],190,190);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==6){
                            previewImg(this,imgDivs[i],750,400);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==7){
                            previewImg(this,imgDivs[i],351,189);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==8){
                            previewImg(this,imgDivs[i],718,250);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==9){
                            previewImg(this,imgDivs[i],750,240);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==10){
                            previewImg(this,imgDivs[i],180,180);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==11){
                            previewImg(this,imgDivs[i],670,824);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==12){
                            previewImg(this,imgDivs[i],750,900);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==13){
                            previewImg(this,imgDivs[i],750,900);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==14){
                            previewImg(this,imgDivs[i],670,300);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==15){
                            previewImg(this,imgDivs[i],750,400);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==16){
                            previewImg(this,imgDivs[i],750,1054);
                        }
                        else if(checkImg.test(fileInputs[i].value)&&index==17){
                            previewImg(this,imgDivs[i],80,80);
                        }
                        else{
                            alert("只支持上传.jpg .png .bmp .jpeg;你的选择有误");
                            fileInputs[i].value="";
                        }
                    };
                })(i);
            }
        }
        
        /* 为IE6 IE7 IE8增加document.getElementsByClassName函数 */
        /MSIE\s*(\d+)/i.test(navigator.userAgent);
        var isIE=parseInt(RegExp.$1?RegExp.$1:0);
        if(isIE>0&&isIE<9){
            document.getElementsByClassName=function(cls){
                var els=this.getElementsByTagName('*');
                var ell=els.length;
                var elements=[];
                for(var n=0;n<ell;n++){
                    var oCls=els[n].className||'';
                    if(oCls.indexOf(cls)<0)        continue;
                    oCls=oCls.split(/\s+/);
                    var oCll=oCls.length;
                    for(var j=0;j<oCll;j++){
                        if(cls==oCls[j]){
                            elements.push(els[n]);
                            break;
                        }
                    }
                }
                return elements;
            }
        }
        
        /**
         * 168*168图片上传
         */
        var fileInputs=document.getElementsByClassName("img-btn");//文件选择按钮
        var imgDivs=document.getElementsByClassName("img-container");//图片容器
        
        /*为750*450的coverPic单独配置*/
        var fileInputs_coverPic=document.getElementsByClassName("img-btn-coverPic");//文件选择按钮
        var imgDivs_coverPic=document.getElementsByClassName("img-container-coverPic");//图片容器
        
        /**
         *置顶图片大小限制在750*400
         */
        var fileInputs_topPic=document.getElementsByClassName("img-btn-topPic");//文件选择按钮
        var imgDivs_topPic=document.getElementsByClassName("img-container-topPic");//图片容器
        
        /**
         * 队伍图标100*100
         */
        var fileInputs_teamTitlePic=document.getElementsByClassName("img-btn-teamTitle");//文件选择按钮
        var imgDivs_teamTitlePic=document.getElementsByClassName("img-container-teamTitle");//图片容器
        
        /**
         * 190*190图片限制
         */
        var fileInputs_sellerTitlePic=document.getElementsByClassName("img-btn-sellerTitle");//文件选择按钮
        var imgDivs_sellerTitlePic=document.getElementsByClassName("img-container-sellerTitle");//图片容器

        /**
         *750*400图片限制-首页banner的尺寸
         */
        var fileInputs_bannerTitlePic=document.getElementsByClassName("img-btn-bannerTitle");//文件选择按钮
        var imgDivs_bannerTitlePic=document.getElementsByClassName("img-container-bannerTitle");//图片容器

        /**
         *351*189图片限制-首页二级广告位
         */
        var fileInputs_secondTitlePic=document.getElementsByClassName("img-btn-secondTitle");//文件选择按钮
        var imgDivs_secondTitlePic=document.getElementsByClassName("img-container-secondTitle");//图片容器

        /**
         *718*250图片限制-首页热门活动广告位
         */
        var fileInputs_hotTitlePic=document.getElementsByClassName("img-btn-hotTitle");//文件选择按钮
        var imgDivs_hotTitlePic=document.getElementsByClassName("img-container-hotTitle");//图片容器

        /**
         *750*240图片限制-首页推荐商品大图广告位
         */
        var fileInputs_recommendTitlePic=document.getElementsByClassName("img-btn-recommendTitle");//文件选择按钮
        var imgDivs_recommendTitlePic=document.getElementsByClassName("img-container-recommendTitle");//图片容器


        /**
         *180*180图片限制-首页推荐商品小图广告位
         */
        var fileInputs_smallTitlePic=document.getElementsByClassName("img-btn-smallTitle");//文件选择按钮
        var imgDivs_smallTitlePic=document.getElementsByClassName("img-container-smallTitle");//图片容器

        /*670*824图片限制-评选活动/活动列表大图*/
        var fileInputs_voteTitlePic=document.getElementsByClassName("img-btn-voteTitle");//文件选择按钮
        var imgDivs_voteTitlePic=document.getElementsByClassName("img-container-voteTitle");//图片容器

        /*750*900图片限制-活动详情列表大图*/
        var fileInputs_activityPic=document.getElementsByClassName("img-btn-activity");//文件选择按钮
        var imgDivs_activityPic=document.getElementsByClassName("img-container-activity");//图片容器

        var fileInputs_cardPic=document.getElementsByClassName("img-btn-card");//文件选择按钮
        var imgDivs_cardPic=document.getElementsByClassName("img-container-card");//图片容器

        /*670*300*图片限制-资讯列表图*/
        var fileInputs_infoTitlePic=document.getElementsByClassName("img-btn-infoTitle");//文件选择按钮
        var imgDivs_infoTitlePic=document.getElementsByClassName("img-container-infoTitle");//图片容器
        /*750*400*图片限制-资讯详情图*/
        var fileInputs_infoCoverPic=document.getElementsByClassName("img-btn-infoCover");//文件选择按钮
        var imgDivs_infoCoverPic=document.getElementsByClassName("img-container-infoCover");//图片容器

        /*750*1054-图片限制-自发评选*/
        var fileInputs_notePic=document.getElementsByClassName("img-btn-noteCover");//文件选择按钮
        var imgDivs_notePic=document.getElementsByClassName("img-container-noteCover");//图片容器

        /*80*80-图片限制-分享链接图片*/
        var fileInputs_sharePic=document.getElementsByClassName("img-btn-ShareCover");//文件选择按钮
        var imgDivs_sharePic=document.getElementsByClassName("img-container-ShareCover");//图片容器

        selectImg(fileInputs,imgDivs,1);
        selectImg(fileInputs_coverPic,imgDivs_coverPic,2);
        selectImg(fileInputs_topPic,imgDivs_topPic,3);
        selectImg(fileInputs_teamTitlePic,imgDivs_teamTitlePic,4);
        selectImg(fileInputs_sellerTitlePic,imgDivs_sellerTitlePic,5);
        selectImg(fileInputs_voteTitlePic,imgDivs_voteTitlePic,11);
        selectImg(fileInputs_activityPic,imgDivs_activityPic,12);
        selectImg(fileInputs_cardPic,imgDivs_cardPic,13);
        selectImg(fileInputs_infoTitlePic,imgDivs_infoTitlePic,14);
        selectImg(fileInputs_infoCoverPic,imgDivs_infoCoverPic,15);
        selectImg(fileInputs_notePic,imgDivs_notePic,16);
        selectImg(fileInputs_sharePic,imgDivs_sharePic,17);
        
        
        
        
        
        