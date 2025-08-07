import profile_martin from "../assets/profile_martin.png";

const ResumeTemplate4 = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-start space-x-2 mb-2">
        <div>
          <img src={profile_martin} alt="" className="h-28 w-28 mr-5 object-cover" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-0.5 text-blue-500">
            Martin Smith
          </h3>
          <div className="flex flex-col space-x-2 text-gray-500">
            <p>
              <span className="font-semibold">Address: </span>123 Anywhere St,
              Any City
            </p>
            <p>
              <span className="font-semibold">Phone: </span>123-456-789
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              martin.smith@email.com
            </p>
            <p>
              <span className="font-semibold">LinkedIn: </span>
              linkedin/martinsmith
            </p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Summary</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <p className="mt-2">
          Experienced software engineer with a strong background in developing
          scalable web applications and a passion for problem-solving.
          Proficient in JavaScript, React, and Node.js.
        </p>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Work Experience</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <div className="mt-2">
          <h4 className="font-semibold">Software Engineer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Tech Solutions Inc.</p>
            <p className="font-semibold">Jan 2020 - Present</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Developed and maintained web applications using React and Node.js.
            </li>
            <li>
              Collaborated with cross-functional teams to define, design, and
              ship new features.
            </li>
            <li>
              Improved application performance by optimizing code and
              implementing best practices.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Junior Developer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Web Innovations Ltd.</p>
            <p className="font-semibold">Jun 2018 - Dec 2019</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Assisted in the development of client-side applications using
              HTML, CSS, and JavaScript.
            </li>
            <li>
              Participated in code reviews and contributed to team knowledge
              sharing.
            </li>
            <li>
              Resolved bugs and implemented enhancements based on user feedback.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Education</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between mb-0.5">
            <h4 className="font-semibold">
              Indian Institute of Technology Bombay
            </h4>
            <p className="font-semibold">Jul 2013 - May 2017</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Bachelor of Technology in Computer Science</p>
            <p>CGPA : 8.7</p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Projects</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
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
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Skills</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li><span className="font-semibold">Frontend:</span>  HTML, CSS, JavaScript, React, Node.js</li>
          <li><span className="font-semibold">Backend:</span> RESTful APIs, Git, Agile Methodologies</li>
          <li><span className="font-semibold">Others:</span> Problem Solving, Team Collaboration</li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Certifications</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Certified JavaScript Developer</li>
          <li>React Professional Certification</li>
          <li>Node.js Fundamentals</li>
        </ul>
      </div>
      <div className="mb-1 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Awards</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>GSoc Contributor Google</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate4;
