import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobById } from '../api/jobApis';
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineMenuBook, MdPayments } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { FaBriefcase } from 'react-icons/fa';
import expertise from '../icons/expertise.png';


interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    salary: number;
    responsibilities: string[];
    rating: string;
    skills: string[];
    qualification: string;
    about_company: string[];
    experience: string;
    address: string;
}

const JobDetail = ({ job: jobProp }: { job?: Job }) => {
    const { id } = useParams();

    const { data, isLoading } = useQuery<Job>({
        queryKey: ['job', id],
        queryFn: () => fetchJobById(id!),
        // enabled: !!id,
        enabled: !!id && !jobProp,
    });

    const job = jobProp || data;

    if (isLoading) return <p className="text-center">Loading job...</p>;

    if (!job) return <p className="text-center text-red-500">Job not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className='flex justify-between'>
                <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <p>{job.rating}</p>
                    <p className="text-gray-600">{job.company} — {job.location}</p>
                </div>

                <div>
                    <button
                        onClick={() => alert('Apply clicked!')}
                        className="mt-2 bg-emerald-100 text-black px-2 py-2 font-medium w-35 rounded-full"
                    >
                        Apply Now
                    </button>
                </div>
            </div>

            <hr className="my-4" />
            <div>
                <div className="flex items-center gap-2 mt-2">
                    <FaBriefcase size={15} />
                    <p className="text-1xl font-medium text-gray-700">Job Type</p>
                </div>
                <div>
                    <span className='flex items-center gap-2 text-gray-500 ml-2'>
                        {job.type}
                    </span>
                </div>
            </div>


            <div>
                <div className="flex items-center gap-2 mt-2">
                    <MdPayments />
                    <p className="text-1xl font-medium text-gray-700">Salary</p>
                </div>
                <div>
                    <span className='flex items-center gap-2 text-gray-500 ml-2'>
                        {job.salary}
                    </span>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mt-2">
                    <h1 className="flex items-center text-xl font-semibold">
                        <img src={expertise} alt="wave" className="w-4 h-4 inline-block text-gray-500" />
                    </h1>
                    <p className="text-1xl font-medium text-gray-700">Experience</p>
                </div>
                <div>
                    <span className="px-3 text-blue-700 text-sm rounded-1">
                        Required {job.experience}
                    </span>
                </div>
            </div>
            {/* bg-[#e4f7e6] */}
            {/* border border-blue-300 */}
            <div>
                <p className="text-1xl text-gray-700 font-medium">About Company</p>
                <p>
                    <ul>
                        {job.about_company.map((res) => (
                            <li className="text-gray-500 mb-2">{res}</li>
                        ))}
                    </ul>
                </p>
            </div>

            <div>
                <div className="flex items-center gap-1 mt-2">
                    <IoLocationSharp />
                    <p className="text-1xl font-medium text-gray-700">Location</p>
                </div>
                <div>
                    <span className='flex items-center text-gray-500 ml-2'>
                        {job.address}
                    </span>
                </div>
            </div>
            <br />
            <div className="border p-2 rounded shadow-sm hover:shadow-md transition w-[700px] h-[240px] overflow-y-auto">
                <h5 className="text-lg text-gray-700 font-medium">Profile Insight's</h5>
                <h6 className="text-sm text-gray-500">Here’s how the job qualifications align with your profile</h6>

                <div className="flex items-center gap-2 mt-2">
                    <HiOutlineLightBulb />
                    <p className="text-base font-medium m-0 text-gray-700">Skills Required</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((res, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-gray-300 text-amber-700 text-sm rounded-full border border-blue-300"
                        >
                            {res}
                        </span>
                    ))}
                </div>
                <div>
                    <div className="flex items-center gap-2 mt-2">
                        <MdOutlineMenuBook />
                        <p className="text-base font-medium m-0 text-gray-700" >Education Qualification</p>
                    </div>

                    <p className='text-gray-500'> {job.qualification}</p>
                </div>
            </div>

            <p className="text-base font-medium mt-2 text-gray-700">Job Description :</p>
            <p>{job.description}</p>
            <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
                {job.responsibilities.map((point) => (
                    <li>{point}</li>
                ))}
            </ul>
        </div>
    );
};

export default JobDetail;