 <!-- nodemon : https://www.youtube.com/watch?v=cYHPNurmXGU -->
 <!-- in home pge, when user is not logged in, addtocart doesnt do anything -->

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

   ok...no it doesnt. it causes infinite rerender.so it should be based on id. check code for more understanding.

5. when not logged in , in productdetails, after clicking addtocart btn, how the modal is poping up?
6. pages/ShowProductsByCategory.jsx e nicher code na dle ki hbe?

```useEffect(() => {
    fetchData(checkedProducts);
  }, [checkedProducts]);
```

one step pichone thakbe always..useEffect with checkedProducts is crucial—it ensures that fetchData is called with the latest state. Without it, calling fetchData() directly after setCheckedProducts would use the state before it has been updated.  
use the useEffect hook that watches for changes in checkedProducts. This way, whenever checkedProducts changes, useEffect runs fetchData with the latest state.asynchronous nature of React's setState function. When you update the state using setCheckedProducts, the state doesn't change immediately. Instead, React schedules the update and then, after a render cycle, the state is updated. This means that right after calling setCheckedProducts([...checkedProducts, id]), checkedProducts still holds the old state until the next render.
