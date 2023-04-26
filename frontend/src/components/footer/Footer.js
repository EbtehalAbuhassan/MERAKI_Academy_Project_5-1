import React ,{ useRef } from 'react';
import './footer.css';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Footer() {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_izy9qws', 'template_nisndqp', form.current, 'qsWx1Nn--di_P6Z59')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div className='footer-container'>
      <div className='footer-subscription'>
      <div className="contact">
        <div className="contacttitle">
          <h1 style={{fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif"
}}> Lets Keep in Touch</h1>
        </div>
        <div class="vertical">
        <form ref={form} onSubmit={sendEmail}>
          <br></br>
        <label>Name</label>
        <br></br>
        <input type="text" name="from_name" />
        <br></br>
        <label>Email</label>
        <br></br>
        <input type="email" name="user_email" />
        <br></br>
        <label>Message</label>
        <br></br>
        <textarea name="message" />
        <br></br>
        <input type="submit" value="Send" />
        </form>
      </div>
        
      </div>
      </div>
      
        
          <div class='footer-link-items'>
            <h2 style={{fontFamily:"'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande','Lucida Sans', Arial, sans-serif"}} >About Us</h2>
            <p>BeeHive is more than just a website.it's a community of talented freelancers and ambitious clients.
               all working together to bring their projects to life. Just like the busy bees in a hive, our platform is always buzzing with activity as clients post their projects and freelancers compete to take on the task. Whether you're a client looking for help on a project or a freelancer eager to showcase your skills, BeeHive is the perfect place to connect and collaborate. So join the swarm today and see what all the buzz is about! </p>
          </div>
        
        </div>
        
     
    
  );
}

export default Footer;