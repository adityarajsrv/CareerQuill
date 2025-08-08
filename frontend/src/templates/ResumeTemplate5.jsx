import { FaLocationDot } from "react-icons/fa6";
import profile_martin from "../assets/profile_martin.png";
import { IoCall, IoMailSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";

const ResumeTemplate5 = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-8 bg-white shadow-md border border-gray-300 text-sm">
      <div className="flex flex-row justify-between mb-5">
        <div className="flex flex-row space-x-3">
          <img
            src={profile_martin}
            alt="Profile of Martin Smith"
            className="h-28 w-28 mr-5 object-cover"
          />
          <div className="mt-3">
            <h2 className="text-4xl font-extrabold tracking-wide">MARTIN</h2>
            <h2 className="text-4xl font-bold">SMITH</h2>
            <p className="text-md tracking-wider">
              Senior Digital Marketing Specialist
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1 mt-4">
          <div className="flex flex-row justify-center items-center space-x-1.5">
            <p>(415) 555-1234</p>
            <IoCall />
          </div>
          <div className="flex flex-row justify-center items-center space-x-1.5">
            <p>martin.smith@outlook.com</p>
            <IoMailSharp />
          </div>
          <div className="flex flex-row justify-center items-center space-x-1.5">
            <p>123 Market St, San Francisco, CA 94103</p>
            <FaLocationDot />
          </div>
          <div className="flex flex-row justify-center items-center space-x-1.5">
            <p>linkedin.com/in/martinsmith</p>
            <FaLinkedin />
          </div>
        </div>
      </div>
      <div className="h-0.25 w-full bg-black mb-3"></div>
      <div className="flex flex-row">
        <div className="w-1/3 pr-4">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                PROFILE
              </h3>
              <p className="text-gray-600">
                Results-driven Digital Marketing Specialist with over 7 years of
                experience in developing and executing data-driven marketing
                strategies. Proven track record of increasing brand visibility,
                driving website traffic, and boosting conversion rates through
                SEO, SEM, and social media campaigns. Adept at leading
                cross-functional teams and leveraging analytics to optimize
                performance.
              </p>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                SKILLS
              </h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Search Engine Optimization (SEO)</li>
                <li>Pay-Per-Click (PPC) Advertising</li>
                <li>Social Media Marketing</li>
                <li>Content Strategy Development</li>
                <li>Data Analytics (Google Analytics, Tableau)</li>
                <li>Email Marketing Automation</li>
                <li>Project Management</li>
              </ul>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                LANGUAGE
              </h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>English (Native)</li>
                <li>Spanish (Fluent)</li>
                <li>French (Intermediate)</li>
              </ul>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                ACHIEVEMENTS
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Increased organic website traffic by 180% through advanced SEO
                  strategies for a retail client in 2022.
                </li>
                <li>
                  Spearheaded a social media campaign that boosted brand
                  engagement by 95% in 2023.
                </li>
              </ul>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                HOBBIES/INTERESTS
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Digital Photography</li>
                <li>Blogging on Marketing Trends</li>
                <li>Competitive Chess</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-0.25 bg-black mx-4"></div>
        <div className="w-2/3 pl-3">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                EDUCATION
              </h3>
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <p className="font-medium">
                    • Master of Business Administration (MBA), Marketing
                  </p>
                  <p className="text-gray-600">2018 - 2020</p>
                </div>
                <p className="text-gray-600">
                  University of California, Berkeley, Haas School of Business
                  <br />
                  Graduated with honors, focusing on digital marketing
                  strategies and consumer behavior analytics. Completed a
                  capstone project on optimizing e-commerce conversion funnels.
                </p>
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <p className="font-medium">
                    • Bachelor of Arts in Communication
                  </p>
                  <p className="text-gray-600">2014 - 2018</p>
                </div>
                <p className="text-gray-600">
                  University of Southern California, Los Angeles
                  <br />
                  Specialized in digital media and public relations. Served as
                  president of the Marketing Club, organizing events to connect
                  students with industry professionals.
                </p>
              </div>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                WORK EXPERIENCE
              </h3>
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <p className="font-medium">BrightWave Marketing</p>
                  <p className="text-gray-600">2021 - Present</p>
                </div>
                <p className="text-gray-600">
                  Senior Digital Marketing Manager
                </p>
                <ul className="list-disc list-inside space-y-1 ml-5">
                  <li>
                    Led a team of 8 marketers to develop and execute
                    multi-channel campaigns, increasing client ROI by 35%.
                  </li>
                  <li>
                    Optimized PPC campaigns, reducing cost-per-click by 20%
                    while improving conversion rates.
                  </li>
                  <li>
                    Implemented data-driven SEO strategies, resulting in a 150%
                    increase in organic traffic for key clients.
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <p className="font-medium">NextGen Solutions</p>
                  <p className="text-gray-600">2019 - 2021</p>
                </div>
                <p className="text-gray-600">Digital Marketing Specialist</p>
                <ul className="list-disc list-inside space-y-1 ml-5">
                  <li>
                    Managed social media accounts for 10+ clients, growing
                    follower engagement by 80% through targeted content.
                  </li>
                  <li>
                    Designed and executed email marketing campaigns, achieving a
                    25% open rate and 10% click-through rate.
                  </li>
                  <li>
                    Collaborated with design teams to create visually compelling
                    branding materials.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <p className="font-medium">CreativePulse Agency</p>
                  <p className="text-gray-600">2017 - 2019</p>
                </div>
                <p className="text-gray-600">Marketing Coordinator</p>
                <ul className="list-disc list-inside space-y-1 ml-5">
                  <li>
                    Supported campaign execution for a portfolio of 15 clients,
                    focusing on content creation and SEO.
                  </li>
                  <li>
                    Analyzed campaign performance using Google Analytics,
                    providing actionable insights to improve results.
                  </li>
                  <li>
                    Assisted in rebranding efforts, including logo design and
                    website redesign for 3 major clients.
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-0.25 w-full bg-black"></div>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide mb-2">
                PROJECTS
              </h3>
              <div className="mb-4">
                <div className="flex flex-row justify-between">
                  <p className="font-medium">E-commerce SEO Overhaul</p>
                  <p className="text-gray-600">2022</p>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-5">
                  <li>
                    Revamped SEO strategy for a retail client, increasing
                    organic traffic by 120% within 6 months.
                  </li>
                  <li>
                    Collaborated with developers to optimize site speed and
                    structure, improving user experience.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <p className="font-medium">
                    Social Media Campaign for Product Launch
                  </p>
                  <p className="text-gray-600">2021</p>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-5">
                  <li>
                    Designed and executed a multi-platform campaign, boosting
                    product launch engagement by 80%.
                  </li>
                  <li>
                    Utilized A/B testing to refine ad targeting, increasing
                    click-through rates by 15%.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate5;
