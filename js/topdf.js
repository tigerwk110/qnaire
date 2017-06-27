//处理PDF样式
function handlePDFCss() {
  //为防止打印出黑色背景，需设置白色背景
  document.getElementsByClassName("step-design-body")[0].style.background = "#FFFFFF";
  document.getElementsByClassName("right-aside")[0].style.background = "#FFFFFF";

  //去掉每个问题的页脚
  var footer = document.getElementsByClassName("sub-questions-footer");
  for (var i = 0; i < footer.length; i++) {
    footer[i].style.display = "none";
  }

  //去除所有边框
  var title = document.getElementsByClassName("questionnaire-title");
  for (var i = 0; i < title.length; i++) {
    title[i].style.border = "0";
  }

  var questions = document.getElementsByClassName("sub-questions");
  for (var i = 0; i < questions.length; i++) {
    questions[i].style.border = "0";
    questions[i].className += " sub-questions-active";
  }

  //去掉矩阵的右侧按钮
  var rBtn = document.getElementsByClassName("matrix-addBtn-right");
  for (var i = 0; i < rBtn.length; i++) {
    rBtn[i].style.display = "none";
  }

  //修改提示框的样式
  // document.getElementById("questionnaire-tip-")[0].className += " questionnaire-tip-active";

  //修改每个问题的标题的样式
  var qTitle = document.getElementsByClassName("sub-questions-title");
  for (var i = 0; i < qTitle.length; i++) {
    qTitle[i].className += " sub-questions-title-active";
  }
}

//恢复样式
function recoverPDFCss() {
  //去掉每个问题的页脚
    var footer = document.getElementsByClassName("sub-questions-footer");
    for (var i = 0; i < footer.length; i++) {
      footer[i].style.display = "block";
    }

    //去除所有边框
    var title = document.getElementsByClassName("questionnaire-title");
    for (var i = 0; i < title.length; i++) {
      title[i].style.border = "1px solid #ccc";
    }

    var questions = document.getElementsByClassName("sub-questions");
    for (var i = 0; i < questions.length; i++) {
      questions[i].style.border = "1px solid #ccc";
      questions[i].className = "sub-questions";
    }

    //去掉矩阵的右侧按钮
    var rBtn = document.getElementsByClassName("matrix-addBtn-right");
    for (var i = 0; i < rBtn.length; i++) {
      rBtn[i].style.display = "block";
    }

    //修改每个问题的标题的样式
    var qTitle = document.getElementsByClassName("sub-questions-title");
    for (var i = 0; i < qTitle.length; i++) {
      qTitle[i].className = "sub-questions-title";
    }
}

//打开弹窗
function openPopup() {
  $("#layout-cover-container").show(500);
}

//关闭弹窗
function closePopup() {
  $("#layout-cover-container").hide(500);
}

//保存PDF问卷
function downloadPDF() {
  handlePDFCss();
  $('body,html').animate({scrollTop:0}, 500);

  setTimeout(function () {
    html2canvas(document.getElementsByClassName("right-aside")[0], {
      onrendered:function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 10;
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
        var name = document.getElementsByClassName("questionnaire-title")[0].innerHTML + ".pdf";
        pdf.save(name);
      }
    });

    recoverPDFCss();
  }, 550);
}

//重做PDF
function reEditPDF() {
  $("#questions-container").empty();

  //加回啦边框
  var title = document.getElementsByClassName("questionnaire-title");
  for (var i = 0; i < title.length; i++) {
    title[i].style.border = "1px solid #ccc";
  }
}

//为按钮绑定事件
function bindEvent(target, events) {
  target.unbind();

  target.one("click", function () { //注意只绑定一次就要解除这个事件
    closePopup();
    events();
  });
}

//为弹窗的取消按钮绑定关闭弹窗事件
$("#popup-cancel-btn").on("click", function () {
  closePopup();
});

//弹窗右上角的关闭按钮
$("#popup-btn-close").on("click", function () {
  closePopup();
});

/*
 * content: 传入弹窗的提示信息
 * type: 事件类型：0-预览PDF， 1-保存PDF
 */
function Popup(content, type) {
  this.content = content;
  this.type = type;

  this.rendarTipData();
  this.confirmEvent();

  openPopup();
}

//数据渲染，加载提示信息到弹窗
Popup.prototype.rendarTipData = function () {
  $("#popup-tip").html(this.content);
}

Popup.prototype.confirmEvent = function () {
  switch(this.type) {
    //预览按钮
    case 0: bindEvent($("#popup-confirm-btn"), reEditPDF);
            break;
    //保存
    case 1: bindEvent($("#popup-confirm-btn"), downloadPDF);
            break;
  }
}

$('#fn-btn-downlaod').on("click", function () {
  var obj = new Popup("确认下载该问卷吗？", 1);
  obj = null;
})

$('#fn-btn-reset').on("click", function () {
  var obj = new Popup("确认重新制作问卷吗？该操作无法撤回！", 0);
  obj = null;
})

//预览PDF
function previewPDF() {
  handlePDFCss();
  $('body,html').animate({scrollTop:0}, 500);
  
  setTimeout(function () {
    $("#preview-container").show();
    $("#canvas-container").show();
     
    html2canvas(document.getElementsByClassName("right-aside")[0], {
      onrendered:function(canvas) {
        document.getElementById("canvas-container").appendChild(canvas);
      }
    });

    recoverPDFCss();
  }, 550)
}

$("#fn-btn-preview").on("click", function (){
  previewPDF();
});

//预览窗口的关闭按钮
$('#fn-btn-return').on("click", function () {
  document.getElementById("canvas-container").removeChild(document.getElementsByTagName("canvas")[0]);
  $("#preview-container").hide(500);
})
