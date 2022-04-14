$(document).ready(() => {
    const DATA = window.localStorage.getItem("store");
    if (DATA) {
        $(".show-store span").text(JSON.parse(DATA).length);
    }
    const data = [
        {
            ten: "Nike Black",
            gia: "2.000.000₫",
            listImg: ["./static/img/product3/1.jpg", "./static/img/product3/2.jpg", "./static/img/product3/3.jpg", "./static/img/product3/4.jpg"]
        },
        {
            ten: "Nike White",
            gia: "3.000.000₫",
            giagoc: "4.500.000₫",
            listImg: ["./static/img/product4/1.jpg", "./static/img/product4/2.jpg", "./static/img/product4/3.jpg", "./static/img/product4/5.jpg"]
        },
        {
            ten: "Nike Red",
            gia: "6.000.000₫",
            giagoc: "10.000.000₫",
            listImg: ["./static/img/product1/1.jpg", "./static/img/product1/2.jpg", "./static/img/product1/3.jpg", "./static/img/product1/4.jpg"]
        },
        {
            ten: "Nike Green",
            gia: "4.000.000₫",
            listImg: ["./static/img/product2/1.jpg", "./static/img/product2/2.jpg", "./static/img/product2/3.jpg", "./static/img/product2/4.jpg"]
        }
    ]
    $(".show-detail #detail #close i").click((e) => {
        $(".show-detail").addClass("none");
    })
    $(".store #store #close i").click((e) => {
        $(".store").addClass("none");
    })
    $(".all-product .mb-5 a").click((e) => {
        const idx = $(e.target).attr("data");
        const currentData = data[parseInt(idx)];
        $(".alert-success").addClass("none");
        $(".show-detail").removeClass("none");
        $(".box-detail #detail #info-detail ._add_store").attr("data", idx);
        $(".show-detail #main-img img").attr("src", currentData.listImg[0]);
        for (var i = 0; i < 4; i += 1) {
            $(".show-detail #slide-img #_item" + i).attr("src", currentData.listImg[i]);
        }
        $(".box-detail #detail #info-detail #name").text(currentData.ten)
        $(".box-detail #detail #info-detail #giaban").text(currentData.gia);
        if (currentData.giagoc) {
            $(".box-detail #detail #info-detail #giagoc").removeClass("none");
            $(".box-detail #detail #info-detail #giagoc span").text(currentData.giagoc);
        } else {
            $(".box-detail #detail #info-detail #giagoc").addClass("none");
        }
        $("._quality").val(1);
        

    })
    $(".box-detail #detail #info-detail ._add_store").click((e) => {
        const idx = $(e.target).attr("data");
        const storeItem = data[parseInt(idx)];
        storeItem.size = $(".box-detail #list-size .btn-dark").text();
        storeItem.count = $("._quality").val();

        var storeAll = window.localStorage.getItem("store");
        if (storeAll) {
            storeAll = JSON.parse(storeAll);
            storeAll.push(storeItem);
        } else {
            storeAll = [storeItem];
        }
        window.localStorage.setItem("store", JSON.stringify(storeAll));
        $(".show-store span").text(storeAll.length);
        $(".alert-success").removeClass("none");
    })
    $(".show-detail #slide-img img").click((e) => {
        var src = $(e.target).attr("src");
        $(".show-detail #main-img img").attr("src", src);
    })
    const renderStore = () => {
        var dom = ``;
        var storeAll = window.localStorage.getItem("store");
        var allPrice = 0;
        storeAll = JSON.parse(storeAll);
        if (storeAll && storeAll.length > 0) {
            for (var i = 0; i < storeAll.length; i++) {
                var storeItem = storeAll[i];
                var priceItem = storeItem.gia.split("₫")[0];
                priceItem = parseInt(priceItem.split(".").join("")); 
                allPrice += priceItem*parseInt(storeItem.count);
                dom += `
                <div class="itemStore">
                  <div id="img">
                    <img src="${storeItem.listImg[0]}" />
                  </div>
                  <div id="info">
                    <p style="margin-left: 10px">Tên: ${storeItem.ten}</p>
                    <p>
                      <span>Giá: ${storeItem.gia}</span><span>Size: ${storeItem.size}</span
                      ><span>Số lượng: ${storeItem.count}</span>
                    </p>
                    <a id="_delete_item_in_store" href="#" data="${i}">Xóa</a>
                  </div>
                </div>
                `
            }
        } else {
            dom = '<h1>Bạn chưa có sản phẩm nào!</h1>'
        }
        allPrice = allPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "₫";
        $(".allStore").html(dom);
        $(".payment #total span").text(allPrice)
    }
    $(document).on("click", ".itemStore a", async(e) => {
        var idx = parseInt($(e.target).attr("data"));
        var storeAll = JSON.parse(window.localStorage.getItem("store"));
        if(idx < storeAll.length){
            storeAll.splice(idx, 1);
        }
        $(".show-store span").text(storeAll.length);
        window.localStorage.setItem("store", JSON.stringify(storeAll));
        await renderStore();
    })
    $(".show-store").click( async(e) => {
        await renderStore();
        $(".store").removeClass("none");
        
    })
    $("._sub_quality").click((e) => {
        var currnetValue = parseInt($("._quality").val());
        if (currnetValue > 1) currnetValue -= 1;
        $("._quality").val(currnetValue);
    })
    $("._add_quality").click((e) => {
        var currnetValue = parseInt($("._quality").val());
        currnetValue += 1;
        $("._quality").val(currnetValue);
    })
    $(".box-detail #list-size button").click((e) => {
        $(".box-detail #list-size button").removeClass("btn-dark");
        $(e.target).addClass("btn-dark")
        // currentSize = parseInt($(e.target).val());

    })
})