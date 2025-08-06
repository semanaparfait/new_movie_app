import React from 'react'
import './Contactus.css'
import contact from '../../assets/images/contactus/contactus.jpg'

function Contactus() {
  return (
    <main>
        <div className='contactus-image'>
            <img src={contact} alt="contactuse image" className='w-full h-90'/>
        </div>
        <div className='bg-[#d8dee3] p-10 text-center'> 
        <div className='text-center p-8'><br />
        <h2 className='text-[black] font-bold '><strong>Contact  </strong>& Join Together</h2><br />
        <p className="text-center text-[black]">Have questions or need assistance? We're here to help! Reach out to us through any of the <br />following methods, and our team will get back to you as soon as possible.</p>
        </div><br /><br />
          <div className='flex flex-wrap justify-evenly items-center gap-8  '>
          {/* <!-- Location --> */}
          <div className="contact-box">
            <div className="heading" >

              <i class="fas fa-map-marker-alt"></i>
              <h3>Location <br /><strong>Visit Us At</strong> </h3>
            
            </div>
              <p>65th Street, Los Angeles.<br />3rd Street, San Andreas.</p>
          </div>
  
          {/* <!-- Phone --> */}
          <div className="contact-box">
            <div className="heading">

              <i class="fas fa-phone-alt"></i>
              <h3>24/7 Service <br /><strong>Call Us On</strong></h3>
            </div>
              <p>Tel: +81-245-54896<br />Mob: +81-125-87965</p>
          </div>
  
          {/* <!-- Email --> */}
          <div className="contact-box">
            <div className="heading">

              <i class="fas fa-envelope"></i>
              <h3>Drop A Line <br /><strong>Mail Address</strong></h3>
            </div>
              <p>info@domain.com<br />domain@company.com</p>
          </div>
  
          {/* <!-- Office Hours --> */}
          <div className="contact-box">
            <div className="heading">

              <i class="fas fa-clock"></i>
              <h3>Office Hours <br /><strong>Opening Time</strong></h3>
            </div>
              <p>Mon - Fri: 9am - 6pm<br />Sunday (Closed)</p>
          </div>
      </div><br /><br />
        </div>
       <div className='flex flex-wrap items-start gap-8 bg-white p-6 '>
  {/* Google Map */}
  <div className='w-full md:w-[48%]'>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1771.0241351126176!2d30.080213922644408!3d-1.9826346604764145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6108d6db08d%3A0xbfc486d1fb045285!2sKK%20567%20St%2C%20Kigali!5e1!3m2!1sen!2srw!4v1752690422812!5m2!1sen!2srw"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl shadow"
    ></iframe>
  </div>

  {/* Contact Form */}
  <div className='w-full md:w-[48%] padding-6'>
    <form className='contact-form flex flex-col gap-4'>
      <h2 className='text-[#000000] font-bold text-2xl'>Get In Touch</h2>
      <input type="text" placeholder='Your Name' required className='p-3 border rounded-lg' />
      <input type="email" placeholder='Your Email' required className='p-3 border rounded-lg' />
      <textarea rows="5" placeholder='Your Message' required className='p-3 border rounded-lg'></textarea>
      <button
        type="submit"
        className='bg-[#4CAF50] text-white rounded-2xl py-3 text-base font-semibold hover:bg-[#3CAF50] transition duration-200 h-[2.5rem]'
      >
        Send Message
      </button>
    </form>
  </div>
</div>

    </main>
  )
}

export default Contactus