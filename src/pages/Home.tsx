import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchJobs, fetchJobById } from '../api/jobApis';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import { useNavigate } from 'react-router-dom';
import JobDetail from './JobDetail';
import { IoPersonCircleOutline } from 'react-icons/io5';
import hand from '../icons/wave.png';

const Home = () => {
    const navigate = useNavigate();

    // const [data, setData] = useState<any>();
    // const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const fetchData = async () => {
    //     try {
    //         const res = await fetchJobs();
    //         console.log('lkkkkkkkkkkkkkkkk', res)
    //         setIsLoading(true)
    //         setData(res)
    //     }
    //     catch {
    //         console.log('eeeeeeeeeeee')
    //     }
    // }
    const { data: jobs } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
    });


    // console.log('aaaaaaaaaaa', jobs)
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const { data: selectedJob } = useQuery({
        queryKey: ['job', selectedJobId],
        queryFn: () => fetchJobById(selectedJobId!),
        enabled: !!selectedJobId,
    });


    const filteredJobs = jobs?.filter((job: any) => {
        const matchCompany = selectedCompanies.includes(job.company);
        const matchLocation = selectedLocations.includes(job.location);

        if (selectedCompanies.length === 0 && selectedLocations.length === 0) {
            return true;
        }
        return matchCompany || matchLocation;
    });


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const name = localStorage.getItem('name')
    return (
        <div className="h-screen flex flex-col max-w-full mx-auto">
            <div className='flex items-center justify-between p-5'>
                <h1 className="text-2xl font-bold">Job Listings</h1>
                <h1 className="flex items-center gap-2 text-xl font-semibold">
                    Hello <img src={hand} alt="wave" className="w-6 h-6 inline-block" /> {name}
                </h1>
                <span className="flex items-center gap-1 cursor-pointer" onClick={handleLogout}>
                    <IoPersonCircleOutline size={27} />
                    <h2 className="text-orange-600 font-bold">Logout</h2>
                </span>

            </div>
            <br />
            <FilterBar
                onSelectCompany={setSelectedCompanies}
                onSelectLocation={setSelectedLocations}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Left - Job List */}
                <div className="w-2/5 border-r overflow-y-auto p-4">
                    <div className="flex flex-col items-center gap-4">
                        {filteredJobs?.map((job: any) => (
                            <div
                                key={job.id}
                                onClick={() => setSelectedJobId(job.id)}
                                className="cursor-pointer"
                            >
                                <JobCard job={job} onView={setSelectedJobId} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Job Detail */}
                <div className="w-3/5 overflow-y-auto p-4 hide-scrollbar">
                    {selectedJobId ? (
                        selectedJob ? (
                            <JobDetail job={selectedJob} />
                        ) : (
                            <p className="text-center">Loading job details...</p>
                        )
                    ) : (
                        <p className="text-center text-gray-500 mt-10">Select a job to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
