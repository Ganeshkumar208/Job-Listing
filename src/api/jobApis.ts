import axios from 'axios';

const BASE_URL = 'https://6846df3a7dbda7ee7ab0ada2.mockapi.io/job-listing';


export const fetchJobs = async () => {
    const response = await axios.get(`${BASE_URL}/jobs`);
    return response.data; // return only the job array
};

export const fetchJobById = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/jobs/${id}`);
    return res.data; // return actual job object
};
