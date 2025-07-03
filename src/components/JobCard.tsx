interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    responsibilities: string[];
    rating: string;
    skills: string[];
    qualification: string;
    about_company: string[];
}

interface JobCardProps {
    job: Job;
    onView: (id: string) => void;
}
const JobCard: React.FC<JobCardProps> = ({ job, onView }) => (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition bg-gradient-to-b from-[#f6f0ea] to-[#859096] w-96 h-60">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <p>{job.company} — {job.location}</p>
        <p>{job.rating}</p>
        <p className="text-sm text-gray-700">{job.type}</p>
        <ul className="text-sm text-gray-800 list-disc list-inside mt-2 space-y-1">
            {job.responsibilities.slice(0, 2).map((point, index) => (
                <li key={index} className="truncate max-w-full">{point}</li>
            ))}
            {job.responsibilities.length > 2 && (
                <li className="text-gray-700 italic">...and more</li>
            )}
        </ul>
        {/* <Link to={`/job/${job.id}`} className="text-[#faedcd] mt-2 inline-block font-medium">
            View Details
        </Link> */}

        <span
            onClick={() => onView(job.id)}
            className="text-[#faedcd] mt-2 inline-block font-medium cursor-pointer"
        >
            View Details
        </span>

    </div>
);

export default JobCard;
