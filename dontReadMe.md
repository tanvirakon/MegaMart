1. after setting using useState, tring to log?!  
    wont work:
   setAllProductDetailsInCart(productDetailsData);
   console.log("allProductDetailsInCart---",allProductDetailsInCart);
   work:
   setAllProductDetailsInCart(productDetailsData);
   useEffect(() => {
   console.log("allProductDetailsInCart---", allProductDetailsInCart);
   }, [allProductDetailsInCart]);

2. after taping dlt button on any product in cartpage, how the product number on cart icon at navbar changes on real time?!  
   at app.js I created fetchProductCountInCart() which sets the noOfProductInCart, using react-context when i call it after deleting any product in AddToCartPage.jsx , i call fetchProductCountInCart() again to rerender noOfProductInCart

3. after taping dlt button on any product in cartpage, how the carts gets deleted on real time without refreshing page?!  
   in AddToCartPage.jsx the fetchCartDetails() fetch all data of cart. so in the dlt function i call it again. so the page rerender.so writing code outside useEffect is pretty useful.

4. after clicking a product from homepage, from the recommended products below, how the page changing without refreshing?<br>
   by clicking any product in RecommendedProduct.jsx , as its still in the ProductDetails.jsx page ,though the url endpoint changes, the pages itself doesnt changes. so in ProductDetails.jsx we need a rerender of productData. [productData] does the trick
   ```
   useEffect(() => {
   fetchData();
   }, [productData]);
   ```
