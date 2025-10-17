import { IoCall, IoMailSharp } from "react-icons/io5";
import { FaGithub, FaLinkedin } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

const ResumeTemplate2 = () => {
  // const downloadPDF = () => {
  //   const element = document.getElementById("resume-content");
  //   html2pdf()
  //     .set({
  //       margin: 0.5,
  //       filename: "Amit_Sharma_Resume.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //     })
  //     .from(element)
  //     .save();
  // };

  return (
    <div>
      <div className="flex justify-end mb-4 max-w-3xl mx-auto">
        <button
          // onClick={downloadPDF}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer"
        >
          Download PDF
        </button>
      </div>
      <div className="max-w-3xl mx-auto py-4 px-8 bg-white shadow-md border border-gray-300 text-sm" id="resume-content">
        <div className="text-center mb-2">
          <h3 className="text-lg font-bold mb-1">Amit Sharma</h3>
          <p className="text-sm mx-auto">
            Software Engineer with over 6 years of experience in full-stack web development, specializing in React, Node.js, and TypeScript. Skilled in building scalable, user-focused applications and optimizing performance through agile methodologies. Proven ability to deliver high-quality code and drive measurable business outcomes.
          </p>
        </div>
        <div className="flex flex-row gap-3 mb-2 justify-center">
          <div className="flex flex-row items-center space-x-1 justify-center">
            <IoMailSharp className="mt-0.5 text-blue-400" />
            <p>amit.sharma@gmail.com</p>
          </div>
          <div className="flex flex-row items-center space-x-1 justify-center">
            <IoCall className="mt-0.5 text-blue-400" />
            <p>+91 987654321</p>
          </div>
          <div className="flex flex-row items-center space-x-1 justify-center">
            <FaLinkedin className="mt-0.5 text-blue-400" />
            <p>linkedin.com/amitsharma</p>
          </div>
          <div className="flex flex-row items-center space-x-1 justify-center">
            <FaGithub className="mt-0.5 text-blue-400" />
            <p>github.com/amitsharma-dev</p>
          </div>
        </div>
        <div className="mb-3">
          <h3 className="font-bold py-1 text-blue-400">Work Experience</h3>
          <div className="h-0.25 w-full bg-black"></div>
          <div className="mt-2">
            <h4 className="font-semibold">Senior Software Engineer</h4>
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">SkyNet Solutions, San Francisco, CA</p>
              <p>March 2020 - Present</p>
            </div>
            <ul className="list-disc pl-5 mt-1">
              <li>Developed scalable web applications using React, TypeScript, and Node.js, increasing user retention by 20%.</li>
              <li>Designed and implemented RESTful APIs with Express, reducing server response time by 25%.</li>
              <li>Integrated CI/CD pipelines using Jenkins, improving deployment efficiency by 15%.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Software Developer</h4>
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">BlueWave Technologies, San Diego, CA</p>
              <p>July 2018 - February 2020</p>
            </div>
            <ul className="list-disc pl-5 mt-1">
              <li>Built responsive front-end interfaces using HTML, CSS, JavaScript, and React, enhancing user experience for 10+ clients.</li>
              <li>Optimized MongoDB queries in Node.js backend, improving data retrieval speed by 20%.</li>
              <li>Conducted code reviews in agile teams, reducing bug rates by 10%.</li>
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <h3 className="font-bold py-1 text-blue-400">Education</h3>
          <div className="h-0.25 bg-black w-full"></div>
          <div className="mt-2">
            <div className="flex flex-row justify-between mb-0.5">
              <h4 className="font-semibold">University of California, San Diego</h4>
              <p>September 2014 - June 2018</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>Bachelor of Science in Computer Science</p>
              <p>GPA: 3.85/4.0</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold py-1 text-blue-400">Projects</h3>
          <div className="h-0.25 bg-black w-full"></div>
          <div>
            <h4 className="font-semibold">Personal Portfolio Website</h4>
            <ul className="list-disc pl-5 mt-1">
              <li>Developed a responsive portfolio website using React, Tailwind CSS, and Vercel, showcasing technical projects and skills.</li>
              <li>Optimized for Search Engine Optimization (SEO) and cross-browser compatibility, achieving a 90% Lighthouse score.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">E-commerce Web Application</h4>
            <ul className="list-disc pl-5 mt-1">
              <li>Built a full-stack e-commerce platform with React, Node.js, Express, and MongoDB.</li>
              <li>Implemented secure user authentication with JSON Web Tokens (JWT) and integrated Stripe for payment processing.</li>
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <h3 className="font-bold py-1 text-blue-400">Skills</h3>
          <div className="h-0.25 bg-black w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            <li><span className="font-semibold">Frontend Development:</span> HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS</li>
            <li><span className="font-semibold">Backend Development:</span> Node.js, Express, MongoDB, RESTful APIs</li>
            <li><span className="font-semibold">Tools & Methodologies:</span> Git, Docker, Jenkins, Amazon Web Services (AWS), Agile</li>
          </ul>
        </div>
        <div className="mb-3">
          <h3 className="font-bold py-1 text-blue-400">Certifications</h3>
          <div className="h-0.25 bg-black w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            <li>AWS Certified Developer – Associate</li>
            <li>Meta Front-End Developer Professional Certificate</li>
            <li>Node.js Certified Developer</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold py-1 text-blue-400">Awards</h3>
          <div className="h-0.25 bg-black w-full"></div>
          <ul className="list-disc pl-5 mt-1">
            <li>Google Summer of Code Contributor, 2019</li>
            <li>Outstanding Developer Award, SkyNet Solutions, 2022</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;