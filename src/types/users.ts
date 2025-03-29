export interface User {
    email: string;
    phone: string;
    username: string;
}

export interface CandidateProfile {
    id: number;
    user: User;
    linkedin_profile: string;
    github_profile: string;
    degree: string;
    institution: string;
    year_of_completion: number;
    job_title: string;
    company: string;
    start_date: string; // ISO date string
    end_date: string;   // ISO date string
    currently_working: boolean;
    skills: {
        id: number;
        name: string;
    }[];
    job_type: string;
    expected_salary: string;
    notice_period: number;
    resume_file_url: string;
}
