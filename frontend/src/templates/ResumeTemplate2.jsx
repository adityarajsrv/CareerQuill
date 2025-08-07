import {IoCall, IoMailSharp} from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ResumeTemplate2 = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold mb-1">Amit Sharma</h3>
        <p className="text-sm mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab maiores
          earum est, voluptates neque accusamus doloribus dignissimos rem
          quidem, nam asperiores, dolor praesentium ea hic dicta labore sapiente
          tenetur cum.
        </p>
      </div>
      <div className="flex flex-row space-x-3 mb-2 justify-center">
        <div className="flex flex-row items-center space-x-1 justify-center">
          <IoMailSharp className="mt-0.5 text-blue-400"/>
          <p>amit.sharma@example.com</p>
        </div>
        <div className="flex flex-row items-center space-x-1 justify-center">
          <IoCall className="mt-0.5 text-blue-400"/>
          <p>+91 98765 43210</p>
        </div>
        <div className="flex flex-row items-center space-x-1 justify-center">
          <FaLinkedin className="mt-0.5 text-blue-400"/>
          <p>linkedin.com/amitsharma</p>
        </div>
        <div className="flex flex-row items-center space-x-1 justify-center">
          <FaGithub className="mt-0.5 text-blue-400"/>
          <p>github.com/amitsharma</p>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-bold py-1 text-blue-400">Work Experience</h3>
        <div className="h-0.25 w-full bg-black"></div>
        <div className="mt-2">
          <h4 className="font-semibold">Software Engineer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Tech Solutions Inc.</p>
          <p>Jan 2020 - Present</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed and maintained web applications using React and Node.js.</li>
            <li>Collaborated with cross-functional teams to define, design, and ship new features.</li>
            <li>Improved application performance by optimizing code and implementing best practices.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Junior Developer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Web Innovations Ltd.</p>
            <p>Jun 2018 - Dec 2019</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Assisted in the development of client-side applications using HTML, CSS, and JavaScript.</li>
            <li>Participated in code reviews and contributed to team knowledge sharing.</li>
            <li>Resolved bugs and implemented enhancements based on user feedback.</li>
          </ul>
        </div>    
      </div>
      <div className="mb-3">
        <h3 className="font-bold py-1 text-blue-400">Education</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between mb-0.5">
            <h4 className="font-semibold">Indian Institute of Technology Bombay</h4>
            <p>Jul 2013 - May 2017</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Bachelor of Technology in Computer Science</p>
            <p>CGPA : 8.7</p>
          </div>
        </div>  
      </div>
      <div>
        <h3 className="font-bold py-1 text-blue-400">Projects</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div>
          <h4 className="font-semibold">Portfolio Website</h4>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed a personal portfolio website to showcase projects and skills using React and Tailwind CSS.</li>
            <li>Made the website responsive across various different browsers.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">E-commerce Application</h4>
          <ul className="list-disc pl-5 mt-1">
            <li>Built a full-stack e-commerce application with Node.js, Express, and MongoDB.</li>
            <li>Implemented user authentication, product management, and payment processing.</li>
          </ul>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-bold py-1 text-blue-400">Skills</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li><span className="font-semibold">Frontend:</span>  HTML, CSS, JavaScript, React, Node.js</li>
          <li><span className="font-semibold">Backend:</span> RESTful APIs, Git, Agile Methodologies</li>
          <li><span className="font-semibold">Others:</span> Problem Solving, Team Collaboration</li>
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="font-bold py-1 text-blue-400">Certifications</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Certified JavaScript Developer</li>
          <li>React Professional Certification</li>
          <li>Node.js Fundamentals</li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold py-1 text-blue-400">Awards</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>GSoc Contributor Google</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
