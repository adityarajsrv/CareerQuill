import profile_martin from "../assets/profile_martin.png";

const ResumeTemplate4 = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-6 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-start space-x-2 mb-2">
        <img src={profile_martin} alt="Profile of Martin Smith" className="h-28 w-28 mr-5 object-cover" />
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-0.5 text-blue-500">
            Martin Smith
          </h3>
          <div className="flex flex-col space-x-2 text-gray-500">
            <p>
              <span className="font-semibold">Address: </span>456 Pine St,
              Seattle, WA 98101
            </p>
            <p>
              <span className="font-semibold">Phone: </span>(206) 555-7890
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              martin.smith@gmail.com
            </p>
            <p>
              <span className="font-semibold">LinkedIn: </span>
              linkedin.com/in/martinsmith-dev
            </p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Summary</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <p className="mt-2">
          Dedicated Software Engineer with 6+ years of experience building scalable web applications using modern JavaScript frameworks. Proficient in React, Node.js, and TypeScript, with a strong focus on delivering user-centric solutions and optimizing performance. Passionate about clean code, agile methodologies, and collaborative problem-solving.
        </p>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Work Experience</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <div className="mt-2">
          <h4 className="font-semibold">Senior Software Engineer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">CloudPeak Technologies</p>
            <p className="font-semibold">Feb 2021 - Present</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed scalable web applications using React, TypeScript, and Node.js, improving user retention by 25%.</li>
            <li>Led a team of 5 developers in implementing a microservices architecture, reducing API response times by 30%.</li>
            <li>Integrated CI/CD pipelines using GitHub Actions, streamlining deployment processes.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Software Developer</h4>
          <div className="flex flex-row justify-between">
            <p className="text-gray-600">Nexlify Solutions</p>
            <p className="font-semibold">Aug 2018 - Jan 2021</p>
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li>Built responsive client-side applications using HTML, CSS, JavaScript, and React, enhancing user experience.</li>
            <li>Contributed to backend development with Node.js and Express, creating RESTful APIs for 10+ clients.</li>
            <li>Conducted code reviews, reducing bug rates by 15% through improved coding standards.</li>
          </ul>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Education</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <div className="mt-2">
          <div className="flex flex-row justify-between mb-0.5">
            <h4 className="font-semibold">
              University of Washington
            </h4>
            <p className="font-semibold">Sep 2014 - Jun 2018</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Bachelor of Science in Computer Science</p>
            <p>GPA: 3.8/4.0</p>
          </div>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Projects</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <div>
          <h4 className="font-semibold">Portfolio Website</h4>
          <ul className="list-disc pl-5 mt-1">
            <li>Designed and deployed a personal portfolio website using React, Tailwind CSS, and Vercel for hosting.</li>
            <li>Ensured cross-browser compatibility and responsive design, achieving 95% Lighthouse performance score.</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">E-commerce Platform</h4>
          <ul className="list-disc pl-5 mt-1">
            <li>Developed a full-stack e-commerce application using Node.js, Express, MongoDB, and React.</li>
            <li>Implemented secure user authentication with JWT and integrated Stripe for payment processing.</li>
          </ul>
        </div>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Skills</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li><span className="font-semibold">Frontend:</span> HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS</li>
          <li><span className="font-semibold">Backend:</span> Node.js, Express, MongoDB, RESTful APIs</li>
          <li><span className="font-semibold">Tools:</span> Git, Docker, AWS, Agile Methodologies</li>
        </ul>
      </div>
      <div className="mb-3 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Certifications</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>AWS Certified Developer – Associate</li>
          <li>Meta Front-End Developer Professional Certificate</li>
          <li>Google Cloud Platform Fundamentals</li>
        </ul>
      </div>
      <div className="mb-1 text-gray-600">
        <h3 className="font-bold py-1 text-blue-500">Awards</h3>
        <div className="h-0.25 bg-blue-400 w-full"></div>
        <ul className="list-disc pl-5 mt-1">
          <li>Google Summer of Code Contributor, 2019</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate4;