# <h1 align=center><a name="0">**ORIZON**</a></h1>

<details>
  <summary>Menù</summary>
 <ol>
   <li><a href="#1">About The Project</a></li>
  <li><a href="#2">Built With</a></li>
  <li><a href="#3">Usage</a></li>
  <li><a href="#4">Contact</a></li>
 </ol>
</details>

### <a name="1">About The Project</a>

<br/>
<img src="img/img01.png width="30%">

<p align=right><a href="#0">back to top</a></p>

---

### <a name="2">Built With</a>

- [Node.js](https://nodejs.org)
- [MySql](https://www.w3schools.com/MySQL/default.asp)

<p align=right><a href="#0">back to top</a></p>

---

### <a name="3">Usage</a>

1.  Run `npm intall`
2.  Install migrations.sql file
   

3.  Open `.env` and configure the file to allow a connection to the database.

    ```sh
    APP_PORT=3000
    DB_PORT=3307
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASS=password
    MYSQL_DB=orizon_db
    TEST_MYSQL_DB=orizon_test
    ```
4. Run `npm start`.
5.  Show all the products in your localhost.

    ```sh
    http://127.0.0.1:3000/api/product
    ```

6.  Show all the users in your localhost.

    ```sh
    http://127.0.0.1:3000/api/user
    ```
    
7.  Show all the orders in your localhost.

    ```sh
    http://127.0.0.1:3000/api/orders
    ```
7.  To work with database install `Postman Desktop Agent` and run it.
    In Body select raw.
    
    <br/>
    <br/>
<!-- PRODUCT -->
##### <h4 align=center>PRODUCT</h4>
***

- **Read product**:
  <br/>
  Send an HTTP `GET` request to the URL:

```sh
<yourdomain>/api/product
```

- **Update product**:
  <br/>

1. Send an HTTP `PUT` request to the URL:

```sh
 <yourdomain>/api/product//update/<id_product>
```

2.  In Body section:

```sh
    {
    "name":":new name"
    }
```

- **Create product**:
   <br/>

1. Send an HTTP `POST` request to the URL:

    ```sh
    <yourdomain>/api/product
    ```

2. In Body section:
    
    ```sh
    {
    "name":":name"
    } 
    ```

- **Delete product**:
    <br/>
1. Send an HTTP `DELETE` request to the URL:
```sh
     <yourdomain>/api/product/delete/<id_product>
 ```

 <br/>
 <br/>
<!--USER-->

 ##### <h4 align=center>USERS</h4>
***

- **Read users**:
  <br/>
  Send an HTTP `GET` request to the URL:

 ```sh
  <yourdomain>/api/user
```

- **Update user**:
  <br/>

1. Send an HTTP `PUT` request to the URL:

  ```sh
  <yourdomain>/api/user/update/<id>
  ```

2. In Body section:

  ```sh
  {
  "name":":new name",
  "surname":":new surname",
  "email":"new email"
  }
  ```

- **Create user**:
  <br/>

1. Send an HTTP `POST` request to the URL:

  ```sh
  <yourdomain>/api/user
  ```

2. In Body section:

  ```sh
  {
  "name":":name",
  "surname":":surname",
  "email":":email"
  }
  ```

- **Delete user**:
    <br/>

1. Send an HTTP `DELETE` request to the URL:

  ```sh
  <yourdomain>/api/user/delete/<id>
  ```

<br/>
<br/>

<!--ORDERS-->

 ##### <h4 align=center>ORDERS</h4>
***

- **Read orders**:
  <br/>
  Send an HTTP `GET` request to the URL:

 ```sh
  <yourdomain>/api/orders
```

- **Update orders**:
  <br/>

1. Send an HTTP `PUT` request to the URL:

  ```sh
  <yourdomain>/api/user/update/<id_order>
  ```
2. To assign products to order insert id_product,
3. To assign user to order insert user's id,
4. In Body section:

  ```sh
  {
  "products":":id_product, :id_product",
  "users":":user id, :user id",
  
  }
  ```

- **Create order**:
  <br/>

1. Send an HTTP `PUT` request to the URL:

  ```sh
  <yourdomain>/api/orders
  ```
2. To assign products to order insert id_product,
3. To assign user to order insert user's id,
4. In Body section:

  ```sh
  {
  "products":":id_product, :id_product",
  "users":":user id, :user id",
  
  }
  ```

- **Delete order**:
    <br/>

1. Send an HTTP `DELETE` request to the URL:

  ```sh
  <yourdomain>/api/orders/delete/<id_order>
  ```

<br/>
<br/>
  <!-- filter order -->

##### <h4 align=center>FILTER ORDERS</h4>
***

- **By date**:
  <br/>

1. Send an HTTP `GET` request to the URL:

  ```sh
  <yourdomain>/api/orders/filter?date=<YYYY-MM-DD>
  ```


- **By product**:
    <br/>

1. Send an HTTP `GET` request to the URL:

  ```sh
<yourdomain>/api/orders/filter?product=<product name>
  ```


<br/>
<br/>

##### <h4 align=center>Run Test</h4>
***
  <br/>
  Run ` npm test `

<br/>
<br/>
<p align=right><a href="#0">back to top</a></p>

---

### <a name="4">Contact</a>

William - verga.william.95@gmail.com

Project Link: [https://github.com/William-95/Orizon](https://github.com/William-95/Orizon)

<p align=right><a href="#0">back to top</a></p>
 
