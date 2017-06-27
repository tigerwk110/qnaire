# 问卷在线设计平台 2.0
> 链接：<a href="http://mvpzx.top/demo/qnaire/index.html" target="_blank">点击前往</a>

## 新增功能

> 问卷预览 (原理：转换成canvas再插入document)

> 问卷重做 (原理：直接移除问卷父容器的所有子节点)

> 问卷保存 (原理：借助jsPDF.js)

> 新增弹窗二次确认 (原理：js面向对象编程，用到弹窗时便实例化一个弹窗对象，并传入相关数据)

## 下载调试
如果感兴趣，可以点击右上角下载按钮，下载源文件。
由于使用了angular.js的模板指令，载入HTML模板需要通过http|https才可以正常运行，
所以调试时，请搭建一个本地服务器，并将该源码放入服务器根目录下，访问本机相应地址对应端口即可。

> 借助XAMPP进行调试

下载安装XAMPP，将源码放到XAMPP安装目录的htdocs文件夹下，启动Apache服务器，浏览器输入相应地址即可，地址形如：

```
http://localhost:80/qnaire/
```
其中，端口80是默认端口，qnaire是包含源码的文件夹名称。

## 其他

> 坑点提示1 

jsPDF打印成pdf文件时，注意页面要回到打印区域的顶部，我在该demo设置了先回到页面顶部，再打印，这样就不会出现黑块了。

> 坑点提示2 

jsPDF打印成pdf文件时，注意设置打印区域dom的背景色为白色，即`#FFFFFF`。

> 页面中的转存为PDF功能使用了jsPDF插件，源码如下：

```
document.getElementById("toPdfBtn").onclick = function () {
  alert("即将打印，样式会有变化，但不妨碍您继续编辑");

  //为防止打印出黑色背景，需设置白色背景
  document.getElementsByClassName("step-design-body")[0].style.background = "#FFFFFF";
  document.getElementsByClassName("right-aside")[0].style.background = "#FFFFFF";
  
  html2canvas(document.getElementsByClassName("right-aside")[0], {
    onrendered:function(canvas) {

        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
            }
        }

        pdf.save("content.pdf");
    }
  })
}
```

注：需先引入以下文件

```
<script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js"></script>
<script src="https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js"></script>
```

