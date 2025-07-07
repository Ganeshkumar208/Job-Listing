import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobApis";
import { Button, Col, Modal, Row, Select } from "antd";
import { LuFilter } from "react-icons/lu";

interface FilterBarProps {
    onSelectCompany: (company: any) => void;
    onSelectLocation: (location: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSelectCompany, onSelectLocation, }) => {
    const [companies, setCompanies] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);

    // const [tempCompany, setTempCompany] = useState('');
    // const [tempLocation, setTempLocation] = useState('');
    const [tempCompany, setTempCompany] = useState<string[]>([]);
    const [tempLocation, setTempLocation] = useState<string[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const res = await fetchJobs();
                const uniqueCompanies = Array.from(new Set(res.map((job: any) => job.company)));
                const uniqueLocations = Array.from(new Set(res.map((job: any) => job.location)));
                setCompanies(uniqueCompanies);
                setLocations(uniqueLocations);
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            }
        };

        fetchedData();
    }, []);

    const handleApplyFilters = () => {
        onSelectCompany(tempCompany);
        onSelectLocation(tempLocation);
        setIsModalOpen(false);
    };

    const handleReset = () => {
        setTempCompany([]);
        setTempLocation([]);
    };


    return (
        <div className="mb-4 px-4">
            <span className="flex items-center gap-1 cursor-pointer w-56" onClick={() => setIsModalOpen(true)}>
                <h2 className="font-medium ml-25">Apply Filters</h2>
                <LuFilter size={23} />
            </span>

            <Modal
                title="Filter Jobs"
                open={isModalOpen}
                footer={null}
            // bodyStyle={{
            //     height: 200,
            // }}
            >
                <div className="flex flex-col gap-8">
                    <Row gutter={24}>
                        <Col span={12}>

                            <div>
                                <label className="block mb-1 font-medium">Company</label>
                                <Select
                                    value={tempCompany}
                                    onChange={setTempCompany}
                                    allowClear
                                    mode="multiple"
                                    showSearch
                                    className="w-full"
                                    placeholder="Select a company"
                                    maxTagCount='responsive'
                                >
                                    {companies.map((company) => (
                                        <Select.Option key={company} value={company}>
                                            {company}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <label className="block mb-1 font-medium">Location</label>
                                <Select
                                    value={tempLocation}
                                    onChange={setTempLocation}
                                    allowClear
                                    mode="multiple"
                                    showSearch
                                    className="w-full"
                                    placeholder="Select a location"
                                >
                                    {locations.map((loc) => (
                                        <Select.Option key={loc} value={loc}>
                                            {loc}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>

                    </Row>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={handleReset}>Reset</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Clear</Button>
                        <Button onClick={handleApplyFilters}>
                            Apply
                        </Button>
                    </div>
                </div>

            </Modal>
        </div >
    );
};

export default FilterBar;
