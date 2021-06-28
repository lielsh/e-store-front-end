export default function About() {
    return(
       <div className="lead" style={{textAlign: "center"}}>

           <br/><br/><br/><br/>

           <h1>About</h1><br/>
           <img src="/images/about/about.png" alt="about" width="500px"/><br/><br/>

            
           <div style={{textAlign: "left", margin: "0 auto", width: "50%", fontSize: "x-large"}}>
               <u>Welcome to my final project!</u>
               <br/><br/>
               <ul style={{position: "relative", right: "15px"}}>
                   <li>This project was built as part of Experis Academy Full Stack Bootcamp program</li>
                   <br/>
                   <li>It's a computer e-commerce shop - hardware, laptops, peripheral, softwares</li>
                   <br/>
                   <li>This web application was built in React and Node.js, and designed with Bootstrap and Material Design</li>
               </ul>
           </div>

           <br/><br/><br/>
       </div>
    );
}