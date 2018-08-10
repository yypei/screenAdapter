/**
 * Created by yangyp on 2018/8/10.
 */
var screenAdapter={
    initSet:function(cssUrl,designWidth){
        this.designWidth=designWidth?designWidth:1080;
        this.scale=$(window).width()/this.designWidth;
        this.cssUrl=cssUrl;
        if(this.cssUrl instanceof Array){
            for(var i=0;i<this.cssUrl.length;i++){
                this.linkCss(this.cssUrl[i]);
            }
        }else if(this.cssUrl instanceof String){
            this.linkCss(this.cssUrl);
        }
        $('body').prepend($('<style id="adapterStyle"></style>'));
    },
    linkCss:function(cssUrl){
        $.ajax({'url':cssUrl,'dataType':'text','success':function(data){
            var newData=data.replace(/[0-9]{1,}px/g,this.transformCss.bind(this));
            $('#adapterStyle').append(newData);
        }.bind(this)});
    },
    transformCss:function(data){
        var data=Number(data.substring(0,(data.length-2)));
        data=data*this.scale+'px';
        return data;
    },
    setDomSize:function(el,option){
        for(var key in option){
            if(!/%/g.test(option[key])){
                if(/px/g.test(option[key])){
                    $(el).css(key,this.transformCss());
                }else{
                    $(el).css(key,option[key]*this.scale+'px');
                }
            }
        }
    }
};
//    方便在于：使用该插件设计稿上量的多大尺寸就在css里面写多大   不需要换算
//    依赖：依赖jq
//    使用方法：
//        1、初始化设置调用screenAdapter.initSet([],num);  初始化设置传入css路径   可以是一个以字符串形式  也可以是多个以字符串数组形式；第二个参数为设计稿尺寸不传的话默认1080
//        2、如果需要在js里面改变元素的尺寸或者left、top等等和像素有关的调整（调用：screenAdapter.setDomSize($(el),{'width':540})），第一个参数为元素本身   第二个为要调整的样式;