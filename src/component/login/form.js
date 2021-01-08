import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';
import Canvas2Image from 'canvas2image';
// import  './form.css'


const LoginForm = (props) => {
useEffect(() => {
    document.querySelector('button').addEventListener('click', function() {
        // console.log('clicked');
        // html2canvas(document.getElementsByClassName('.specific'), {
        //   onrendered: function(canvas) {
        // console.log('clicked 534');

        //     // document.body.appendChild(canvas);
        //     return Canvas2Image.saveAsPNG(canvas);
        //   }
        // });
        html2canvas(document.body).then(function(canvas) {
            document.body.appendChild(canvas);
        });
      });
})
    return (
        <div className="container-xs">



<div className="specific">
		<h1>Click to Take a Screenshot & Download it! <small>using html2canvas.js + canvas2image.js</small></h1> 
		<p>
		    This is a simple demo.
		</p>
  <p>
		   Use html2canvas.js to take a screenshot of a specific div and then use canvas2image.js to download the screenshot as an image locally to your filesystem.
		</p>
		<button type="button" className="btn btn-default">Take a Screenshot!</button>
  <p>References:  <a href="https://html2canvas.hertzen.com/">html2canvas.js</a><a href="https://github.com/SuperAL/canvas2image">canvas2image.js</a></p>
	</div>

    
            <form method="post">

                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                            <button type="submit"> Login </button>
                            <label>
                                <input type="checkbox" checked="checked" name="remember" /> Remember me
                            </label>
                </div>

            </form>
        </div>
    );
}

export  default LoginForm;
