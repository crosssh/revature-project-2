import * as React from "react";


const Layout = (props: any) => (
  <div>

    <title>Serverless Stripe Checkout Example</title>
    <script src="https://js.stripe.com/v3/" />
    <style>{`
         html {
           height: 100%;
           background: #F6F8FA;
         }
         #container {
           font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
           color: #4C555A;
           min-height: 100%;
           text-align: center;
           -webkit-font-smoothing: antialiased;
         }
         a {
           color: #00a3da;
         }
         a:hover {
           background-color: #fff2a8;
         }
      `}</style>

    <div id="container">
      {props.children}
    </div>
  </div>
);


export default Layout;