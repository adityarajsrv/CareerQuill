const ResumeTemplate3 = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <h3 className="text-lg font-bold mb-1 text-blue-500">John Doe</h3>
      <div className="flex flex-row space-x-2 mb-2 text-gray-500">
        <p>+91 7896542310 |</p>
        <p>john.doe@example.com |</p>
        <p>linkedin.com/johndoe |</p>
        <p>github.com/johndoe</p>
      </div>
      <p className="mb-2 text-xs">
        Proficient in Python (Pandas, NumPy), SQL, and end-to-end machine
        learning and deep learning workflows using Scikit-learn, PyTorch, and
        YOLOv8, with practical experience in data preprocessing, model
        deployment, and real-time analytics.{" "}
      </p>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Education</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between mb-0.5">
            <h4 className="font-semibold">
              Indian Institute of Technology Bombay
            </h4>
            <p>Jul 2013 - May 2017</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Bachelor of Technology in Computer Science</p>
            <p>CGPA : 8.7</p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-700">
        <h3 className="font-bold py-1 text-blue-500">Work Experience</h3>
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
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Key Skills</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-semibold">Frontend:</span> HTML, CSS,
            JavaScript, React, Node.js
          </li>
          <li>
            <span className="font-semibold">Backend:</span> RESTful APIs, Git,
            Agile Methodologies
          </li>
          <li>
            <span className="font-semibold">Tools and Technologies:</span>{" "}
            Jupyter Notebook, VS Code, Git, Streamlit, PyCharm
          </li>
          <li>
            <span className="font-semibold">Others:</span> Problem Solving, Team
            Collaboration
          </li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Projects</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <div>
          <div className="flex flex-row justify-items-start mb-0.5 space-x-1">
            <h4 className="font-semibold">Portfolio Website |</h4>
            <a href="" className="text-blue-500 text-style: underline">
              Project Link
            </a>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Developed a personal portfolio website to showcase projects and
              skills using React and Tailwind CSS.
            </li>
            <li>
              Made the website responsive across various different browsers.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex flex-row justify-items-start mb-0.5 space-x-1">
            <h4 className="font-semibold">E-commerce Application |</h4>
            <a href="" className="text-blue-500 text-style: underline">
              Project Link
              <span className="text-gray-600 font-semibold"> |</span>
            </a>
            <a href="" className="text-blue-500 text-style: underline">
              Live Deployment
            </a>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>
              Built a full-stack e-commerce application with Node.js, Express,
              and MongoDB.
            </li>
            <li>
              Implemented user authentication, product management, and payment
              processing.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Certifications</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Certified JavaScript Developer</li>
          <li>React Professional Certification</li>
          <li>Node.js Fundamentals</li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Achievements</h3>
        <div className="h-0.25 bg-black w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>
            Secured All India Rank 252 in the National Defense Academy (NDA)
            written examination, demonstrating strong aptitude, discipline, and
            national-level competitive excellence.{" "}
          </li>
          <li>
            Solved 100+ Data Structures & Algorithms problems on LeetCode and
            GeeksForGeeks.{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate3;
