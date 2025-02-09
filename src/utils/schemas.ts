import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  location: z.string().min(1, 'Location must be defined'),
  about: z.string().min(10, 'Provide some information about your company'),
  logo: z.string().min(1, 'Please upload a logo'),
  website: z.string().url('Please provide a valid URL'),
  xAccount: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  about: z.string().min(10, 'Provide some information about yourself'),
  resume: z.string().min(1, 'Please upload a resume'),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  employmentType: z.string().min(1, 'Please select an employment type'),
  location: z.string().min(1, 'Location must be defined'),
  salaryFrom: z.number().min(1, 'Please provide a salary range (from)'),
  salaryTo: z.number().min(1, 'Please provide a salary range (to)'),
  jobDescription: z.string().min(1, 'Please provide a job description'),
  listingDuration: z.number().min(1, 'Please provide a listing duration'),
  benefits: z.array(z.string()).min(1, 'Please provide at least one benefit'),
  companyName: z.string().min(1, 'Please provide a company name'),
  companyLocation: z.string().min(1, 'Please provide a company location'),
  companyAbout: z.string().min(10, 'Please provide some information about the company'),
  companyLogo: z.string().min(1, 'Please upload a company logo'),
  companyWebsite: z
    .string()
    .min(1, 'company site is required')
    .url('Please provide a valid company website'),
  companyXAccount: z.string().optional(),
});
